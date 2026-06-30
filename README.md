# Fionas Designs

Premium creative studio website featuring a live 3D waterfall experience built with Next.js, React Three Fiber, and GLSL shaders.

## Tech Stack

- **Next.js 15.5.19** (App Router)
- **React 19.2.7** + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Framer Motion 12** + **GSAP** + **Lenis** smooth scroll
- **Three.js** + **React Three Fiber v9** + **Drei v10** (3D waterfall with custom GLSL shaders)
- **@opennextjs/cloudflare** + **Wrangler v4** for Cloudflare Workers deployment

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare

This project is configured for deployment on **Cloudflare Workers** using [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

### Option 1: CLI deploy (recommended)

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build and deploy in one command
npm run deploy
```

This runs `@opennextjs/cloudflare` to build the Next.js app for the Cloudflare Workers runtime, then `wrangler deploy` to push it live.

### Option 2: Local preview before deploying

```bash
# Build and preview locally on Cloudflare's runtime
npm run preview
```

### Option 3: Cloudflare Pages dashboard (Git integration)

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, create a new **Workers** project and connect the GitHub repository.
3. Configure the build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build:cf`
   - **Deploy command:** `npx wrangler deploy`
4. Add the environment variable `NODE_VERSION` = `20` (or later) if needed.
5. Deploy.

### Configuration files

- `wrangler.jsonc` — Cloudflare Workers configuration (compatibility flags, assets, entry point)
- `open-next.config.ts` — OpenNext adapter configuration
- `next.config.mjs` — Next.js config with OpenNext dev integration

No manual fixes are required — the project builds and deploys cleanly.
