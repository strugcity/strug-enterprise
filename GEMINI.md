# Strug City — Project Context for Gemini

## About
Strug City is a virtual engineering team building AI-powered tools and platforms. This repository contains the main Strug City website.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **CMS:** Sanity (headless CMS, project ID: ktfgvv39, dataset: production)
- **Hosting:** Vercel (planned)

## Design System
We use a Northern Lights-inspired dark theme with an aurora color palette:
- Background: `#060611` (deep space dark)
- Aurora Green: `#00e87b` (primary accent)
- Aurora Teal: `#00ffdd` (secondary accent)
- Aurora Blue: `#2071f5`
- Aurora Purple: `#8b5cf6`
- Aurora Pink: `#d1287c`
- Aurora Cyan: `#23d1fc`

## Project Structure
```
src/
  app/           # Next.js App Router pages
    page.tsx     # Home
    products/    # Products showcase
    stream/      # Progress Stream (development updates)
    blog/        # Blog articles
    about/       # Company info
  components/    # Shared React components (Navbar, Footer)
  lib/           # Utilities (Sanity client, queries)
```

## Key Products
1. **Strug AI Platform** — AI agent orchestration for engineering workflows
2. **Aurora Analytics** — Real-time analytics with AI anomaly detection
3. **NorthStar SDK** — Developer toolkit for AI-native applications
4. **Glacier DB** — Experimental vector database for AI workloads

## Coding Conventions
- Use TypeScript strict mode
- Prefer server components (default in Next.js App Router)
- Use `"use client"` only when needed (interactivity, hooks)
- Tailwind CSS classes for all styling — no CSS modules
- Use our custom color tokens (e.g., `text-aurora-green`, `bg-card`, `border-border`)

## Team Workflow
- **Claude Code:** Orchestration, architecture, integrations, QA/PR reviews
- **GitHub Copilot:** Core coding, component building, pattern-based tasks
- **Vertex AI (Gemini):** Content generation, schema definitions, supplementary coding

## Labels
We use a structured label system:
- `agent:*` — Which AI tool handles the task
- `type:*` — What kind of work (feature, config, qa, content, architecture)
- `priority:*` — Urgency (critical-path, high, medium)
- `stream:*` — Which workstream (1-cms-setup through 5-deploy)

## Brand Voice
Technical but approachable. We build in the open. Minnesota roots, global ambition.
