# Strug City Website

The official web presence for Strug City — a virtual engineering team building AI-powered tools and platforms.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Design:** Northern Lights-inspired dark theme with aurora color palette

## Pages

- **Home** — Hero section, featured products, latest updates, and CTA
- **Products** — Full portfolio showcase with detailed product cards
- **Progress Stream** — Timeline of development updates, milestones, and engineering decisions
- **Blog** — Articles and deep dives from the team
- **About** — Company story, values, and stats

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

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

## Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete deployment instructions including:
- Environment variable configuration
- Preview vs production setup
- Custom domain configuration
- Automatic redeployment on content changes
- Troubleshooting common deployment issues
