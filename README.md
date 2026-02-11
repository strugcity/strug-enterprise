# Strug City Website

The official web presence for Strug City — a virtual engineering team building AI-powered tools and platforms.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **CMS:** Sanity.io (headless CMS)
- **Design:** Northern Lights-inspired dark theme with aurora color palette

## Pages

- **Home** (`/`) — Hero section, featured products, latest updates, and CTA
- **Products** (`/products`) — Full portfolio showcase with detailed product cards
- **Progress Stream** (`/stream`) — Timeline of development updates, milestones, and engineering decisions
- **Blog** (`/blog`) — Articles and deep dives from the team
- **Blog Detail** (`/blog/[slug]`) — Individual blog post pages with Portable Text rendering
- **About** (`/about`) — Company story, values, and stats
- **Sanity Studio** (`/studio`) — Embedded CMS for content management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

- `npm run dev` — Start development server on http://localhost:3000
- `npm run build` — Build production-ready application
- `npm start` — Start production server (requires build first)
- `npm run lint` — Run ESLint for code quality checks
- `npm run seed` — Seed Sanity CMS with initial content (requires SANITY_API_TOKEN)

## Build

```bash
npm run build
npm start
```

## Content Management (Sanity CMS)

This project uses [Sanity](https://www.sanity.io/) as a headless CMS for managing content.

### Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=ktfgvv39
NEXT_PUBLIC_SANITY_DATASET=production

# Required for write operations and seeding
SANITY_API_TOKEN=your_token_here
```

Generate an API token at: https://www.sanity.io/manage/project/ktfgvv39/api#tokens

### Seeding Data

To populate Sanity with initial content (4 products, 20+ stream entries, 5 blog posts):

```bash
npm run seed
```

The seed script is **idempotent** — it can be run multiple times without creating duplicates. It will skip any documents that already exist.

**What gets seeded:**
- 4 products (Strug AI Platform, Aurora Analytics, NorthStar SDK, Glacier DB)
- 20+ stream entries with varied types (milestone, release, engineering, research, announcement)
- 5 blog posts with rich Portable Text bodies

### Content Schemas

Content types are defined in `src/sanity/schemas/`:
- `product.ts` — Product portfolio items
- `streamEntry.ts` — Progress stream updates
- `blogPost.ts` — Blog articles with Portable Text

### Sanity Studio

Access the embedded Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio) to manage content directly within the application. The studio is fully integrated with the Next.js app and requires Sanity authentication.

## SEO & RSS Features

### Sitemap
- Auto-generated sitemap at `/sitemap.xml`
- Includes all static pages and dynamic blog posts
- Updates automatically based on Sanity content

### Robots.txt
- Located at `/robots.txt`
- Allows all crawlers except for `/studio/` and `/api/` routes

### RSS Feeds
- **Blog RSS**: `/feed.xml` — All blog posts
- **Stream RSS**: `/stream/feed.xml` — All progress stream entries
- Both feeds are dynamically generated from Sanity CMS

### OpenGraph Images
- Default OG image: `/opengraph-image`
- Per-blog-post OG images: `/blog/[slug]/opengraph-image`
- Dynamic images generated using Next.js Image Response API

## Deployment

The site is configured for deployment on [Vercel](https://vercel.com).

### Quick Deploy

1. Connect your GitHub repository to Vercel
2. Configure environment variables (see [Environment Variables](#environment-variables) section)
3. Deploy automatically on push to `main` branch

### Environment Variables for Production

Required for Vercel deployment:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=ktfgvv39
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Detailed Deployment Guide

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete deployment instructions including:
- Environment variable configuration
- Preview vs production setup
- Custom domain configuration
- Automatic redeployment on content changes
- Troubleshooting common deployment issues

### Deployment Verification

After deploying, verify your deployment using the checklist in [DEPLOYMENT_VERIFICATION.md](./DEPLOYMENT_VERIFICATION.md).

## Project Structure

```
src/
  app/              # Next.js App Router pages and routes
    page.tsx        # Homepage
    about/          # About page
    blog/           # Blog listing and detail pages
    products/       # Products showcase
    stream/         # Progress stream
    studio/         # Embedded Sanity Studio
    feed.xml/       # Blog RSS feed
    sitemap.ts      # Dynamic sitemap
    robots.ts       # Robots.txt configuration
    opengraph-image.tsx  # Default OG image
  components/       # Shared React components
    Navbar.tsx      # Site navigation
    Footer.tsx      # Site footer
  lib/              # Utilities and helpers
    sanity.ts       # Sanity client configuration
    queries.ts      # GROQ queries for Sanity
    types.ts        # TypeScript type definitions
    blog-utils.ts   # Blog-related utilities
    colorUtils.ts   # Color palette utilities
  sanity/           # Sanity CMS configuration
    sanity.config.ts  # Sanity studio configuration
    schemas/        # Content type schemas
      product.ts
      streamEntry.ts
      blogPost.ts
      index.ts
scripts/
  seed-sanity.ts    # CMS data seeding script
  setup-github-project.sh  # GitHub project setup
```

## TypeScript

This project uses TypeScript with strict mode enabled. Type definitions are located in `src/lib/types.ts` for Sanity content types and throughout the codebase for component props and utilities.

## Documentation

Additional documentation is available in the repository:

- **[AI_TOOLS_QUICK_START.md](./AI_TOOLS_QUICK_START.md)** — Guide for AI tools (Claude Code, GitHub Copilot, Gemini)
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** — Complete Vercel deployment guide
- **[DEPLOYMENT_VERIFICATION.md](./DEPLOYMENT_VERIFICATION.md)** — Post-deployment verification checklist
- **[QA_REPORT.md](./QA_REPORT.md)** — Quality assurance report for page conversions
- **[GEMINI.md](./GEMINI.md)** — Gemini AI tool integration notes
- **[GEMINI_VSCODE_SETUP.md](./GEMINI_VSCODE_SETUP.md)** — VS Code setup for Gemini
- **[SANITY_CI_FIX.md](./SANITY_CI_FIX.md)** — Sanity CI/CD integration fixes
