# Fionas Designs

Premium creative studio website featuring a live 3D waterfall experience built with Next.js, React Three Fiber, and GLSL shaders.

## Tech Stack

- **Next.js 14.2.35** (App Router)
- **React 18.3.1** + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** + **GSAP** + **Lenis** smooth scroll
- **Three.js** + **React Three Fiber** + **Drei** (3D waterfall with custom GLSL shaders)

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare Pages

This project is configured for direct deployment on Cloudflare Pages.

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, create a new Pages project and connect the GitHub repository.
3. Configure the build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
4. Add the environment variable `NODE_VERSION` = `20` (or later) if needed.
5. Deploy. Cloudflare Pages will automatically detect the Next.js framework and handle SSR via its Workers runtime.

No `wrangler` CLI or manual Worker deployment is required — Cloudflare Pages handles everything through the dashboard.
