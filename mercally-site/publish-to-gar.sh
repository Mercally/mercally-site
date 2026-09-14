#!/bin/bash

# Script para publicar imagen Docker a Google Artifact Registry desde local
# Asegúrate de tener gcloud CLI instalado y autenticado

# Verificar si gcloud está instalado
if ! command -v gcloud &> /dev/null; then
    echo "ERROR: gcloud CLI no está instalado."
    echo "Instala Google Cloud SDK desde: https://cloud.google.com/sdk/docs/install"
    echo "En macOS: brew install --cask google-cloud-sdk"
    echo "Luego ejecuta: gcloud init"
    exit 1
fi

# Variables (ajusta según necesites)
PROJECT_ID="caramel-primer-419204"
REGION="northamerica-northeast1"
REPOSITORY="mercally-site"
IMAGE_NAME="mercally-site"
TAG="latest"  # Cambia esto por el tag que quieras usar

# Paso 1: Autenticar con gcloud (si no lo has hecho)
echo "Autenticando con gcloud..."
gcloud auth login

# Paso 1.5: Configurar proyecto
echo "Configurando proyecto..."
gcloud config set project ${PROJECT_ID}

# Paso 2: Configurar Docker para usar gcloud
echo "Configurando Docker para Google Artifact Registry..."
gcloud auth configure-docker ${REGION}-docker.pkg.dev

# Paso 2.5: Verificar y actualizar componentes si es necesario
echo "Verificando componentes de gcloud..."
gcloud components update --quiet
if ! command -v docker-credential-gcloud &> /dev/null; then
    echo "Instalando docker-credential-gcloud..."
    gcloud components install docker-credential-gcr --quiet  # Fallback para compatibilidad
fi

# Paso 3: Crear buildx builder si no existe
echo "Preparando buildx builder..."
if ! docker buildx inspect gar-builder >/dev/null 2>&1; then
    docker buildx create --name gar-builder --use
else
    docker buildx use gar-builder
fi

echo "Construyendo y publicando imagen Docker para linux/amd64..."
docker buildx build --platform linux/amd64 \
    -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${TAG} \
    --push .

echo "¡Imagen publicada exitosamente!"
echo "URL de la imagen: ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${TAG}"