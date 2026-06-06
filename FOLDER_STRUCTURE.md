# Project Folder Structure

This document provides an overview of the directory structure and the purpose of each major component in the **Kota101 Web Portofolio Dosen Blockchain** project.

## Root Directory

- `.aws/`: AWS-specific configurations, including ECS task definitions.
- `.github/`: GitHub Actions workflows for CI/CD.
- `client/`: The frontend application built with React and Vite.
- `server/`: The backend API built with Node.js, Express, and Prisma.
- `docsworkflow/`: Documentation for project-specific workflows (Git, Prisma).
- `dokumen pendukung/`: Supporting documents, such as the Software Requirements Specification (SRS).
- `docker-compose.yml`: Docker Compose configuration for local development and orchestration.
- `dockerfile`: Root-level Dockerfile (if applicable).
- `GEMINI.md`: Project-specific instructions for the Gemini CLI agent.
- `README.md`: General project information and setup instructions.

---

## Frontend (`/client`)

The frontend is a React application using TypeScript and Tailwind CSS.

- `public/`: Static assets like icons and the favicon.
- `src/`: Main source code.
    - `assets/`: Images and other static media.
    - `components/`: Reusable React components.
        - `activity/`: Components related to Tridharma activities.
        - `document/`: Document-related features (comparison, sharing).
        - `figma/`: Components inspired by or related to Figma designs.
        - `file/`: File handling components (upload, preview, versioning).
        - `layout/`: High-level layout components (Sidebar, TopBar).
        - `ui/`: Fundamental UI components (shadcn/ui), such as buttons, cards, and inputs.
    - `contexts/`: React Context providers for global state management (Auth, Notifications).
    - `hooks/`: Custom React hooks for shared logic.
    - `lib/`: Utility functions and shared library configurations.
    - `pages/`: Page-level components representing different application routes.
    - `styles/`: Global CSS, Tailwind configurations, and theme definitions.
- `eslint.config.js`: ESLint configuration.
- `nginx.conf`: Nginx configuration for production deployment.
- `package.json`: Frontend dependencies and scripts.
- `tsconfig.*.json`: TypeScript configurations.
- `vite.config.ts`: Vite build and development configuration.

---

## Backend (`/server`)

The backend is a Node.js API using Express and Prisma ORM.

- `prisma/`: Prisma schema, migrations, and seed data.
    - `schema.prisma`: The database schema definition.
    - `migrations/`: SQL migration files.
    - `seed.ts`: Script for seeding the database with initial data.
- `src/`: Main source code.
    - `controllers/`: Logic for handling incoming HTTP requests.
    - `lib/`: Shared libraries (e.g., Prisma client initialization).
    - `middleware/`: Express middlewares for authentication and validation.
    - `repositories/`: Data access layer for interacting with the database via Prisma.
    - `routes/`: API endpoint definitions, organized by role (Admin, Dosen, Tata Usaha).
    - `services/`: Business logic layer, orchestrating repositories and external services.
- `package.json`: Backend dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `server.ts`: Entry point of the Express application.

---

## Infrastructure and Documentation

- **CI/CD:** Located in `.github/workflows/aws-ci-cd.yml`.
- **Database:** Managed via Prisma in `server/prisma`.
- **Storage:** AWS S3 logic is typically handled in `server/src/services/FileStorageService.ts`.
- **Blockchain:** Multi-chain service logic is in `server/src/services/MultiChainService.ts`.
