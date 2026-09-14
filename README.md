# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references
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

The repository includes `Dockerfile`, Nginx, Docker Compose, and Azure Pipelines configuration
for containerized and automated deployments. Generated build output and installed dependencies are
ignored by Git.

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