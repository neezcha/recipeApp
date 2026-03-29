# recipeApp-vite

A React + TypeScript recipe application built with [Vite](https://vitejs.dev/) and [Radix UI Themes](https://www.radix-ui.com/themes/docs/overview/getting-started).

---

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [Docker](https://www.docker.com/) (for containerised workflows)

---

## Local Development (without Docker)

```bash
npm install
npm start          # Vite dev server → http://localhost:5173
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Starts the Vite dev server at **http://localhost:5173** with hot-module replacement |
| `npm run build` | Type-checks with `tsc` then bundles for production into `dist/` |
| `npm run preview` | Serves the `dist/` folder locally to preview the production build |
| `npm test` | Runs the Vitest test suite in watch mode |
| `npm run coverage` | Runs tests once and generates a coverage report |

---

## Docker

Docker support is provided for both development and production environments.

### Development container

Runs the Vite dev server inside a container using **Node 22 Alpine**. The app is available at **http://localhost:5173**.

```bash
# Build the image
npm run docker:dev:build

# Run the container
npm run docker:dev:run
```

> **Hot-reload with volume mount** — to get file-watching working while running in Docker, pass a volume mount directly:
> ```bash
> docker run -it --rm -p 5173:5173 -v ${PWD}/src:/app/src recipeapp-dev
> ```

### Production container

Multi-stage build: **Node 22 Alpine** compiles and bundles the app, then **nginx:alpine** serves the static output. The app is available at **http://localhost:3002**.

```bash
# Build the image
npm run docker:prod:build

# Run the container
npm run docker:prod:run
```

### Docker scripts summary

| Script | What it does |
|---|---|
| `npm run docker:dev:build` | Builds the development Docker image (`recipeapp-dev`) |
| `npm run docker:dev:run` | Runs the dev container, exposing port **5173** |
| `npm run docker:prod:build` | Builds the production Docker image (`recipeapp-prod`) |
| `npm run docker:prod:run` | Runs the prod container, exposing port **3002** |

---
