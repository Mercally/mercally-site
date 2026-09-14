# Mercally Site

Personal portfolio and software engineering site for Josué Mercadillo. The site presents
professional experience, services, case studies, architecture patterns, technical writing,
certifications, and contact information in a responsive single-page application.

## Technology

- Angular 20 with standalone components
- TypeScript 5.9
- Tailwind CSS 4 through PostCSS
- RxJS
- Jasmine and Karma for unit tests
- Docker and Nginx configuration for production hosting

## Repository layout

```text
.
├── docs/                  # Portfolio and design-system reference material
├── mercally-site/         # Angular application
│   ├── public/             # Static files and public assets
│   └── src/
│       ├── app/components/ # Reusable application components
│       ├── app/models/     # Domain models
│       ├── app/pages/      # Routed page components
│       ├── app/services/   # Application data and theme services
│       └── assets/         # Application assets
└── opencode.json          # Local development configuration
```

## Prerequisites

- Node.js compatible with the Angular 20 toolchain
- npm

## Getting started

Install dependencies from the Angular application directory:

```bash
cd mercally-site
npm install
```

Start the development server:

```bash
npm start
```

Open `http://localhost:4200/` in a browser. The application reloads automatically when source
files change.

## Available commands

Run these commands from `mercally-site/`:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the local development server. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run watch` | Build continuously using the development configuration. |
| `npm test` | Run the unit test suite with Karma and Jasmine. |

## Production build

Build the application with:

```bash
cd mercally-site
npm run build
```

The repository includes `Dockerfile`, Nginx, Docker Compose, and a GitHub Actions workflow for
containerized and automated deployments. Generated build output and installed dependencies are
ignored by Git.

## Continuous deployment

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` and can also be started
manually from GitHub Actions. It builds the image, publishes immutable and `latest` tags to Google
Artifact Registry, copies the Compose files to the VPS, and restarts only the application service.

Configure these secrets in the `production` GitHub Environment:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`: Google Cloud Workload Identity Provider resource name.
- `GCP_SERVICE_ACCOUNT`: Google service account used by GitHub Actions.
- `VPS_HOST`: VPS hostname or IP address.
- `VPS_USER`: SSH deployment user.
- `VPS_SSH_PRIVATE_KEY`: private key for the deployment user.
- `VPS_KNOWN_HOSTS`: pinned SSH host key entry generated with `ssh-keyscan -H <host>`.

The Google service account needs permission to upload images to Artifact Registry. The VPS user
needs permission to run Docker and Docker Compose. No service account files, SSH private keys,
GitHub tokens, or application secrets are stored in the repository.

## Development notes

- Routes are defined in `mercally-site/src/app/app.routes.ts`.
- Shared UI components are under `mercally-site/src/app/components/`.
- Page-specific templates and styles live together under `mercally-site/src/app/pages/`.
- Application data is modeled under `mercally-site/src/app/models/` and exposed through services
 under `mercally-site/src/app/services/`.

## Copyright

Copyright © 2026 Josué Mercadillo. All rights reserved.

This source code is proprietary and confidential.

No permission is granted to copy, modify, distribute, sublicense,

or use this code, in whole or in part, without explicit written

permission from the copyright holder.
