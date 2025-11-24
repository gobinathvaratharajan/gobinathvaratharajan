# Gobinath Varatharajan - Personal Portfolio & Blog

A high-performance personal portfolio and blog built with the modern React ecosystem, optimized for Cloudflare Pages.

## 🚀 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) via [OpenNext](https://opennext.js.org/)
- **Content:** MDX for blog posts
- **Testing:** Vitest & React Testing Library

## 🛠️ Features

- **Server-Side Rendering (SSR)** & **Static Site Generation (SSG)**
- **Incremental Static Regeneration (ISR)** for blog posts (revalidated every hour)
- **Edge Deployment** on Cloudflare
- **Performance Optimized** (LCP, Suspense, Code Splitting)
- **Dark Mode** support

## 🏁 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
npm install
# or
pnpm install
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Running Tests

```bash
npm run test
```

## ☁️ Deployment (Cloudflare)

This project is configured for Cloudflare Pages using OpenNext.

### Important: R2 Bucket Setup

For Incremental Static Regeneration (ISR) to work correctly, you **MUST** create an R2 bucket in your Cloudflare dashboard:

1.  Go to Cloudflare Dashboard > R2.
2.  Create a new bucket named `next-inc-cache`.
3.  This bucket is bound in `wrangler.jsonc` to enable caching.

### Deploy Command

```bash
npm run deploy
```

## 📂 Project Structure

- `/app`: App Router pages and layouts
- `/components`: Reusable UI components
- `/lib`: Utility functions and constants
- `/content`: MDX blog posts (if applicable)
- `wrangler.jsonc`: Cloudflare worker configuration
- `open-next.config.ts`: OpenNext configuration

## 📄 License

MIT
