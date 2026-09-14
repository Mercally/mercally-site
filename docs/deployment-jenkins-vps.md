# Despliegue en VPS mediante Jenkins

Guia para desplegar la imagen Docker de `mercally-site` en el VPS `mercally.com`, usando Jenkins, Docker Compose, Traefik y Google Artifact Registry.

## Arquitectura

```text
Push a main
    |
    v
GitHub Actions
    |
    | Construye y publica la imagen
    v
Google Artifact Registry
    |
    | Dispara Jenkins con IMAGE_TAG
    v
Jenkins en el VPS
    |
    | docker compose pull / up -d
    v
Traefik -> mercally.com
```

GitHub Actions publica la imagen. Jenkins ejecuta el despliegue en el VPS. No es necesario que GitHub Actions tenga acceso SSH al servidor cuando se complete esta migracion.

## Estado actual del repositorio

La aplicacion Angular se encuentra en `mercally-site/` y ya incluye:

- `Dockerfile`: construye Angular y sirve los archivos con Nginx.
- `docker-compose.yml`: define el servicio `app` y la red externa de Traefik.
- `docker-compose.override.yml`: configura la imagen desde variables y las etiquetas de Traefik.
- `.github/workflows/deploy.yml`: construye y publica la imagen.

El workflow actual tambien copia los Compose y se conecta por SSH al VPS. Para usar Jenkins como desplegador, esos pasos SSH deben sustituirse por una llamada al job de Jenkins.

## Requisitos del VPS

El servidor debe tener instalados y funcionando:

- Jenkins
- Docker
- Docker Compose v2
- Google Cloud CLI (`gcloud`)
- Traefik

El usuario de Jenkins debe poder ejecutar Docker:

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
sudo -u jenkins docker ps
docker compose version
```

La red externa usada por Traefik debe existir:

```bash
docker network ls | grep traefik-network
```

Si todavía no existe:

```bash
docker network create traefik-network
```

## Google Artifact Registry

La cuenta de servicio usada por Jenkins necesita como minimo el rol:

```text
roles/artifactregistry.reader
```

La ruta de la imagen configurada actualmente es:

```text
northamerica-northeast1-docker.pkg.dev/caramel-primer-419204/mercally-site/mercally-site:<TAG>
```

Se recomienda desplegar usando el SHA del commit (`GITHUB_SHA`) como `TAG`, en lugar de depender solamente de `latest`.

## Credencial de Jenkins

Crear en Jenkins una credencial de tipo **Secret file** con el ID:

```text
gcp-gar-service-account
```

El archivo debe ser la clave JSON de una cuenta de servicio de Google con permiso de lectura en Artifact Registry.

No guardar la clave JSON en Git ni dentro de la carpeta del proyecto.

## Jenkinsfile

Agregar un `Jenkinsfile` en la raiz del repositorio:

```groovy
pipeline {
    agent any

    parameters {
        string(
            name: 'IMAGE_TAG',
            defaultValue: 'latest',
            description: 'Tag de la imagen publicada'
        )
    }

    environment {
        GCP_PROJECT_ID = 'caramel-primer-419204'
        GAR_LOCATION = 'northamerica-northeast1'
        GAR_REPOSITORY = 'mercally-site'
        IMAGE_NAME = 'mercally-site'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                dir('mercally-site') {
                    withCredentials([
                        file(
                            credentialsId: 'gcp-gar-service-account',
                            variable: 'GOOGLE_APPLICATION_CREDENTIALS'
                        )
                    ]) {
                        sh '''
                            set -eu

                            IMAGE_REGISTRY="${GAR_LOCATION}-docker.pkg.dev/${GCP_PROJECT_ID}"
                            IMAGE_REPOSITORY="${GAR_REPOSITORY}/${IMAGE_NAME}"

                            gcloud auth activate-service-account \\
                              --key-file="${GOOGLE_APPLICATION_CREDENTIALS}" \\
                              --project="${GCP_PROJECT_ID}"

                            gcloud auth configure-docker \\
                              "${GAR_LOCATION}-docker.pkg.dev" \\
                              --quiet

                            printf '%s\\n' \\
                              "DOCKER_REGISTRY=${IMAGE_REGISTRY}" \\
                              "DOCKER_REPOSITORY=${IMAGE_REPOSITORY}" \\
                              "TAG=${IMAGE_TAG}" > .env

                            docker compose \\
                              -f docker-compose.yml \\
                              -f docker-compose.override.yml \\
                              pull app

                            docker compose \\
                              -f docker-compose.yml \\
                              -f docker-compose.override.yml \\
                              up -d \\
                              --remove-orphans \\
                              app
                        '''
                    }
                }
            }
        }

        stage('Health check') {
            steps {
                sh 'curl --fail --silent --show-error --retry 10 --retry-delay 5 https://mercally.com/'
            }
        }
    }
}
```

El `Jenkinsfile` debe ejecutarse en Linux, ya que usa `sh` y comandos Unix.

## Job de Jenkins

Crear un job de tipo **Pipeline** o **Multibranch Pipeline** con:

- Repositorio GitHub.
- Rama `main`.
- Script path: `Jenkinsfile`.
- Parámetro `IMAGE_TAG`.
- Credencial de checkout si el repositorio es privado.

El usuario usado para activar Jenkins desde GitHub Actions solo debe tener permiso para ejecutar este job.

## GitHub Actions

En el environment `production` configurar estos secrets:

```text
JENKINS_URL=https://jenkins.mercally.com
JENKINS_USER=github-deployer
JENKINS_API_TOKEN=<token del usuario de Jenkins>
```

Después del paso que publica la imagen, sustituir los pasos SSH actuales por:

```yaml
- name: Trigger Jenkins deployment
  env:
    JENKINS_URL: ${{ secrets.JENKINS_URL }}
    JENKINS_USER: ${{ secrets.JENKINS_USER }}
    JENKINS_API_TOKEN: ${{ secrets.JENKINS_API_TOKEN }}
  run: |
    set -euo pipefail

    curl --fail --silent --show-error \
      --user "${JENKINS_USER}:${JENKINS_API_TOKEN}" \
      --request POST \
      --data-urlencode "IMAGE_TAG=${GITHUB_SHA}" \
      "${JENKINS_URL}/job/mercally-site/buildWithParameters"
```

La URL anterior puede necesitar codificación si el job está dentro de carpetas Jenkins. En ese caso se debe usar la ruta completa del job.

## Traefik

`docker-compose.override.yml` ya define las etiquetas para:

- `mercally.com`
- `www.mercally.com`
- Redireccion HTTP a HTTPS
- Servicio interno en el puerto `80`

Verificar que el nombre del resolver TLS coincida con la configuración de Traefik. Actualmente aparece:

```yaml
traefik.http.routers.mercally-https.tls.certresolver: "staging"
```

Para producción normalmente debe ser el resolver real, por ejemplo:

```yaml
traefik.http.routers.mercally-https.tls.certresolver: "production"
```

Jenkins debería publicarse en otro hostname, por ejemplo `jenkins.mercally.com`, y no compartir el router de la aplicación.

## Seguridad

- No exponer el Docker socket por TCP a Internet.
- No usar `root` para ejecutar Jenkins.
- No subir claves JSON, tokens o claves SSH al repositorio.
- Usar HTTPS para Jenkins.
- Usar un usuario de Jenkins dedicado para GitHub Actions.
- Limitar los permisos del usuario de GitHub al job de despliegue.
- Mantener `VPS_SSH_PRIVATE_KEY` solo mientras exista el despliegue directo por SSH.

## Checklist de primera configuración

- [ ] Crear el repositorio y la imagen en Artifact Registry.
- [ ] Crear la cuenta de servicio con `roles/artifactregistry.reader`.
- [ ] Guardar la clave como credencial `gcp-gar-service-account` en Jenkins.
- [ ] Añadir Jenkins al grupo Docker.
- [ ] Crear o comprobar `traefik-network`.
- [ ] Crear el job de Jenkins con `Jenkinsfile`.
- [ ] Crear el usuario y API token para activar Jenkins.
- [ ] Añadir `JENKINS_URL`, `JENKINS_USER` y `JENKINS_API_TOKEN` a GitHub.
- [ ] Reemplazar en GitHub Actions el despliegue SSH por el disparo de Jenkins.
- [ ] Confirmar que el resolver TLS de Traefik no sea `staging` en producción.
- [ ] Ejecutar el workflow desde `main`.
- [ ] Verificar `https://mercally.com/`.
