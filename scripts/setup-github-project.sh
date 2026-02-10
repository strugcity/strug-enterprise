#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Strug City Website — GitHub Project Setup
# ==============================================================================
# Run this script from your local machine where `gh` is authenticated.
#
# Prerequisites:
#   - gh CLI installed and authenticated (gh auth login)
#   - Access to the strugcity/strug-enterprise repository
#
# Usage:
#   chmod +x scripts/setup-github-project.sh
#   ./scripts/setup-github-project.sh
# ==============================================================================

REPO="strugcity/strug-enterprise"

echo ""
echo "================================================"
echo "  Strug City — GitHub Project Setup"
echo "================================================"
echo ""
echo "Repository: $REPO"
echo ""

# Check gh is authenticated
if ! gh auth status &>/dev/null; then
  echo "Error: gh CLI is not authenticated. Run 'gh auth login' first."
  exit 1
fi

echo "Authenticated. Starting setup..."
echo ""

# ==============================================================================
# Step 1: Labels
# ==============================================================================
echo "--- Step 1: Creating Labels ---"
echo ""

# Delete default labels that we won't use
DEFAULT_LABELS=("bug" "documentation" "duplicate" "enhancement" "good first issue" "help wanted" "invalid" "question" "wontfix")
for label in "${DEFAULT_LABELS[@]}"; do
  gh label delete "$label" --repo "$REPO" --yes 2>/dev/null && echo "  Deleted default label: $label" || true
done

echo ""

# Agent assignment labels
declare -A AGENT_LABELS=(
  ["agent:claude-code"]="d1287c:Assigned to Claude Code — orchestration, architecture, QA"
  ["agent:copilot"]="00ffdd:Assigned to GitHub Copilot — core coding, patterns"
  ["agent:vertex-ai"]="8b5cf6:Assigned to Vertex AI — content generation, supplementary coding"
)

# Type labels
declare -A TYPE_LABELS=(
  ["type:architecture"]="2071f5:Architecture and system design"
  ["type:feature"]="00e87b:New feature implementation"
  ["type:content"]="23d1fc:Content creation and population"
  ["type:config"]="f0f0f5:Configuration and setup"
  ["type:qa"]="d1287c:Review, testing, QA"
)

# Priority labels
declare -A PRIORITY_LABELS=(
  ["priority:critical-path"]="ff0000:Blocks other work — must be done first"
  ["priority:high"]="ff6600:Important, do soon"
  ["priority:medium"]="ffcc00:Standard priority"
)

# Stream labels
declare -A STREAM_LABELS=(
  ["stream:1-cms-setup"]="d1287c:Stream 1 — Sanity CMS foundation"
  ["stream:2-page-conversion"]="00ffdd:Stream 2 — Convert pages to CMS"
  ["stream:3-content"]="8b5cf6:Stream 3 — Content population"
  ["stream:4-integrations"]="2071f5:Stream 4 — Workflow integrations"
  ["stream:5-deploy"]="00e87b:Stream 5 — Deploy and polish"
)

create_labels() {
  local -n labels=$1
  for label in "${!labels[@]}"; do
    IFS=':' read -r color description <<< "${labels[$label]}"
    gh label create "$label" --color "$color" --description "$description" --repo "$REPO" --force 2>/dev/null \
      && echo "  Created label: $label" \
      || echo "  Updated label: $label"
  done
}

echo "Creating agent labels..."
create_labels AGENT_LABELS
echo "Creating type labels..."
create_labels TYPE_LABELS
echo "Creating priority labels..."
create_labels PRIORITY_LABELS
echo "Creating stream labels..."
create_labels STREAM_LABELS

echo ""
echo "Labels created."
echo ""

# ==============================================================================
# Step 2: Milestones
# ==============================================================================
echo "--- Step 2: Creating Milestones ---"
echo ""

create_milestone() {
  local title="$1"
  local description="$2"
  gh api repos/$REPO/milestones \
    --method POST \
    -f title="$title" \
    -f description="$description" \
    -f state="open" \
    --silent 2>/dev/null \
    && echo "  Created milestone: $title" \
    || echo "  Milestone already exists: $title"
}

create_milestone "Stream 1: Sanity CMS Foundation" \
  "Install packages, create Sanity client config, define content schemas, set up Sanity Studio, write GROQ queries. This is the critical path — all other streams depend on it."

create_milestone "Stream 2: Page Conversion" \
  "Convert all pages from static data to Sanity-fetched content. Products, Progress Stream, Blog, Home featured sections, and individual blog post pages."

create_milestone "Stream 3: Content Population" \
  "Seed data scripts, full blog articles, extended progress stream history. Runs in parallel with Stream 1."

create_milestone "Stream 4: Workflow Integration" \
  "Webhook API routes for GitHub events, generic stream entry API, GitHub Actions for auto-posting, project management integration."

create_milestone "Stream 5: Deploy & Polish" \
  "Vercel environment config, RSS feed, sitemap, Open Graph images, final build verification and deploy."

echo ""
echo "Milestones created."
echo ""

# ==============================================================================
# Step 3: Issues
# ==============================================================================
echo "--- Step 3: Creating Issues ---"
echo ""

# Helper function to create an issue
create_issue() {
  local title="$1"
  local body="$2"
  local milestone="$3"
  shift 3
  local labels=("$@")

  local label_args=""
  for l in "${labels[@]}"; do
    label_args="$label_args --label $l"
  done

  gh issue create \
    --repo "$REPO" \
    --title "$title" \
    --body "$body" \
    --milestone "$milestone" \
    $label_args \
    2>/dev/null \
    && echo "  Created issue: $title" \
    || echo "  Failed to create: $title"
}

# --- Stream 1: Sanity CMS Foundation ---

create_issue \
  "[1a] Install Sanity dependencies" \
  "$(cat <<'BODY'
## Description
Install `next-sanity`, `@sanity/image-url`, and `sanity` packages into the project.

## Acceptance Criteria
- [ ] `next-sanity` installed and in package.json
- [ ] `@sanity/image-url` installed and in package.json
- [ ] `sanity` installed and in package.json
- [ ] `npm run build` passes after installation
- [ ] No version conflicts with existing Next.js 16 setup

## Dependencies
None — this is the first task.

## Agent Notes
**Claude Code**: Package orchestration, dependency resolution.
BODY
)" \
  "Stream 1: Sanity CMS Foundation" \
  "agent:claude-code" "type:config" "priority:critical-path" "stream:1-cms-setup"

create_issue \
  "[1b] Create Sanity client configuration" \
  "$(cat <<'BODY'
## Description
Create the Sanity client configuration at `src/lib/sanity.ts` with support for:
- Production client (for data fetching)
- Preview client (for draft content)
- Environment variable configuration

## Acceptance Criteria
- [ ] `src/lib/sanity.ts` created with typed client exports
- [ ] Environment variables defined: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`
- [ ] `.env.local.example` file created documenting required env vars
- [ ] Client supports both server-side and client-side usage
- [ ] TypeScript types are correct

## Dependencies
- Blocked by: #1 ([1a] Install Sanity dependencies)

## Agent Notes
**Claude Code**: Needs to wire env vars, client setup, and preview mode correctly. Architecture-sensitive.
BODY
)" \
  "Stream 1: Sanity CMS Foundation" \
  "agent:claude-code" "type:config" "priority:critical-path" "stream:1-cms-setup"

create_issue \
  "[1c] Define Sanity content schemas" \
  "$(cat <<'BODY'
## Description
Define Sanity content schemas for all content types:

### Schemas to create:
1. **`blogPost`** — title, slug, body (portable text), excerpt, author, category, publishedAt, readTime, featured image
2. **`streamEntry`** — title, description, type (milestone/release/engineering/research/announcement), tags, timestamp
3. **`product`** — name, slug, description, status, features (array), tags, accentColor, order

### File structure:
```
sanity/
  schemas/
    blogPost.ts
    streamEntry.ts
    product.ts
    index.ts
```

## Acceptance Criteria
- [ ] All three schemas defined with proper field types
- [ ] Schemas use TypeScript
- [ ] Portable Text configured for blog body
- [ ] Slug fields auto-generate from title/name
- [ ] Enum fields for type/status/category with predefined options
- [ ] Schema index exports all schemas

## Dependencies
- Blocked by: #1 ([1a] Install Sanity dependencies)
- Can run in parallel with: #2 ([1b] Sanity client config)

## Agent Notes
**Vertex AI**: Schema definitions are well-structured and repetitive — good use of Google credits.
BODY
)" \
  "Stream 1: Sanity CMS Foundation" \
  "agent:vertex-ai" "type:config" "priority:critical-path" "stream:1-cms-setup"

create_issue \
  "[1d] Set up Sanity Studio at /studio" \
  "$(cat <<'BODY'
## Description
Embed Sanity Studio into the Next.js app at the `/studio` route so the team can manage content directly from the website.

## Acceptance Criteria
- [ ] Sanity Studio accessible at `/studio`
- [ ] Studio loads all defined schemas (blogPost, streamEntry, product)
- [ ] Studio uses the Strug City color palette for branding
- [ ] Route is excluded from the main site layout (no navbar/footer)
- [ ] `sanity.config.ts` created at project root
- [ ] `npm run build` passes

## Dependencies
- Blocked by: #3 ([1c] Content schemas)

## Agent Notes
**Claude Code**: Next.js App Router + Sanity Studio integration requires precise configuration. This is architecture-sensitive.
BODY
)" \
  "Stream 1: Sanity CMS Foundation" \
  "agent:claude-code" "type:feature" "priority:critical-path" "stream:1-cms-setup"

create_issue \
  "[1e] Create GROQ queries for all content types" \
  "$(cat <<'BODY'
## Description
Create typed GROQ queries in `src/lib/queries.ts` for fetching content from Sanity:

### Queries needed:
1. `getAllProducts` — all products ordered by `order` field
2. `getAllStreamEntries` — all stream entries ordered by timestamp desc
3. `getLatestStreamEntries(limit)` — most recent N entries
4. `getAllBlogPosts` — all posts ordered by publishedAt desc
5. `getBlogPostBySlug(slug)` — single post with full body
6. `getFeaturedProducts(limit)` — top N products for home page

## Acceptance Criteria
- [ ] All queries defined in `src/lib/queries.ts`
- [ ] Each query has a corresponding TypeScript return type
- [ ] Queries include only necessary fields (no over-fetching)
- [ ] Queries are tested against Sanity API (or mock)

## Dependencies
- Blocked by: #2 ([1b] Sanity client config), #3 ([1c] Content schemas)

## Agent Notes
**Claude Code**: Needs full understanding of schemas + page data requirements to write efficient queries.
BODY
)" \
  "Stream 1: Sanity CMS Foundation" \
  "agent:claude-code" "type:feature" "priority:high" "stream:1-cms-setup"

# --- Stream 2: Page Conversion ---

create_issue \
  "[2a] Convert Products page to fetch from Sanity" \
  "$(cat <<'BODY'
## Description
Replace the static product data in `src/app/products/page.tsx` with data fetched from Sanity using the GROQ queries.

## Acceptance Criteria
- [ ] Products page fetches data from Sanity at build time
- [ ] All product fields render correctly (name, description, status, features, tags)
- [ ] Accent colors are driven by the `accentColor` field from Sanity
- [ ] Page still builds successfully with `npm run build`
- [ ] Fallback/loading state if no products exist

## Dependencies
- Blocked by: Stream 1 complete (especially #5 GROQ queries)

## Agent Notes
**Copilot**: Pattern — replace static array with async fetch + render. Straightforward once queries exist.
BODY
)" \
  "Stream 2: Page Conversion" \
  "agent:copilot" "type:feature" "priority:high" "stream:2-page-conversion"

create_issue \
  "[2b] Convert Progress Stream page to fetch from Sanity" \
  "$(cat <<'BODY'
## Description
Replace static stream data in `src/app/stream/page.tsx` with data fetched from Sanity. Group entries by date.

## Acceptance Criteria
- [ ] Stream page fetches entries from Sanity
- [ ] Entries are grouped by date (same as current static layout)
- [ ] Type badges and colors render correctly
- [ ] Tags display properly
- [ ] Page builds successfully

## Dependencies
- Blocked by: Stream 1 complete

## Agent Notes
**Copilot**: Same pattern as 2a. Date grouping logic is the main complexity.
BODY
)" \
  "Stream 2: Page Conversion" \
  "agent:copilot" "type:feature" "priority:high" "stream:2-page-conversion"

create_issue \
  "[2c] Convert Blog page to fetch from Sanity" \
  "$(cat <<'BODY'
## Description
Replace static blog post data in `src/app/blog/page.tsx` with data fetched from Sanity.

## Acceptance Criteria
- [ ] Blog listing page fetches posts from Sanity
- [ ] All fields render (title, excerpt, category, date, readTime)
- [ ] Posts link to individual post pages (`/blog/[slug]`)
- [ ] Page builds successfully

## Dependencies
- Blocked by: Stream 1 complete

## Agent Notes
**Copilot**: Same pattern as 2a/2b.
BODY
)" \
  "Stream 2: Page Conversion" \
  "agent:copilot" "type:feature" "priority:high" "stream:2-page-conversion"

create_issue \
  "[2d] Convert Home page featured sections to fetch from Sanity" \
  "$(cat <<'BODY'
## Description
Replace the static featured products and latest updates on the home page (`src/app/page.tsx`) with Sanity-fetched data.

## Acceptance Criteria
- [ ] Featured products section fetches from Sanity (limit 3)
- [ ] Latest updates section fetches from Sanity (limit 3)
- [ ] All existing styling and interactions preserved
- [ ] Page builds successfully

## Dependencies
- Blocked by: Stream 1 complete

## Agent Notes
**Copilot**: Two separate queries on the same page, but same pattern.
BODY
)" \
  "Stream 2: Page Conversion" \
  "agent:copilot" "type:feature" "priority:high" "stream:2-page-conversion"

create_issue \
  "[2e] Build individual blog post page (/blog/[slug])" \
  "$(cat <<'BODY'
## Description
Create a dynamic route at `src/app/blog/[slug]/page.tsx` that renders individual blog posts with full Portable Text content.

## Acceptance Criteria
- [ ] Dynamic route renders blog post by slug
- [ ] Portable Text body renders correctly (headings, paragraphs, code blocks, links, images)
- [ ] Page metadata (title, description) set from post data
- [ ] Back link to blog listing
- [ ] 404 handling for invalid slugs
- [ ] `generateStaticParams` for static generation of known posts

## Dependencies
- Blocked by: Stream 1 complete, [2c] Blog listing page

## Agent Notes
**Copilot**: Dynamic route + Portable Text rendering. May need `@portabletext/react` package.
BODY
)" \
  "Stream 2: Page Conversion" \
  "agent:copilot" "type:feature" "priority:high" "stream:2-page-conversion"

create_issue \
  "[2f] PR Review: All page conversions" \
  "$(cat <<'BODY'
## Description
QA review of all page conversion work from issues 2a–2e.

## Review Checklist
- [ ] All GROQ queries are correct and efficient (no over-fetching)
- [ ] TypeScript types match Sanity schema definitions
- [ ] Error handling for missing/null data
- [ ] Build passes with `npm run build`
- [ ] No hardcoded content remaining (all from CMS)
- [ ] Portable Text rendering handles all block types
- [ ] SEO metadata correctly set from CMS data
- [ ] No regressions in styling or layout

## Dependencies
- Blocked by: #6–#10 (all 2a–2e issues)

## Agent Notes
**Claude Code**: QA pass — verify queries, error handling, types, and security.
BODY
)" \
  "Stream 2: Page Conversion" \
  "agent:claude-code" "type:qa" "priority:high" "stream:2-page-conversion"

# --- Stream 3: Content Population ---

create_issue \
  "[3a] Create Sanity seed data script" \
  "$(cat <<'BODY'
## Description
Create a script (`scripts/seed-sanity.ts` or `.js`) that populates the Sanity dataset with initial content for all content types.

## Content to seed:
- 4 products (Strug AI Platform, Aurora Analytics, NorthStar SDK, Glacier DB)
- 20+ stream entries spanning Jan–Feb 2026
- 5 blog posts with full article content

## Acceptance Criteria
- [ ] Script creates all products with correct fields
- [ ] Script creates stream entries with varied types
- [ ] Script creates blog posts with Portable Text bodies
- [ ] Script is idempotent (can re-run without duplicating)
- [ ] Script uses Sanity mutation API
- [ ] README documents how to run the script

## Dependencies
- Blocked by: #3 ([1c] Content schemas)

## Agent Notes
**Vertex AI**: Bulk structured content generation — ideal for Google credits.
BODY
)" \
  "Stream 3: Content Population" \
  "agent:vertex-ai" "type:content" "priority:high" "stream:3-content"

create_issue \
  "[3b] Generate full blog article content (5 articles)" \
  "$(cat <<'BODY'
## Description
Write full-length blog articles for the seed data. Each should be 800–1500 words with real substance.

## Articles:
1. **"Why We Build in the Open"** — Company philosophy on transparency
2. **"Multi-Agent Orchestration: Patterns That Actually Work"** — Technical deep-dive
3. **"Designing for AI-Native Developer Experience"** — Design principles for NorthStar SDK
4. **"Vector Search at Scale: Lessons from Building Glacier DB"** — Research/benchmarks
5. **"From Minnesota to the Cloud: The Strug City Origin Story"** — Founder story

## Acceptance Criteria
- [ ] Each article is 800–1500 words
- [ ] Content is substantive and technically credible
- [ ] Formatted in Portable Text-compatible structure (headings, paragraphs, code blocks)
- [ ] Consistent brand voice (technical but approachable)
- [ ] Each has a compelling excerpt (1–2 sentences)

## Dependencies
- Can start immediately (content writing doesn't need schemas)

## Agent Notes
**Vertex AI**: Long-form writing at scale — ideal for Google credits.
BODY
)" \
  "Stream 3: Content Population" \
  "agent:vertex-ai" "type:content" "priority:medium" "stream:3-content"

create_issue \
  "[3c] Generate extended progress stream history (20+ entries)" \
  "$(cat <<'BODY'
## Description
Generate 20+ progress stream entries spanning Jan–Feb 2026 that tell a compelling story of Strug City's development journey.

## Entry types to include:
- Milestones (company formation, first pipeline, website launch)
- Releases (version updates, feature ships)
- Engineering (migrations, performance improvements, infra)
- Research (benchmarks, algorithm comparisons)
- Announcements (beta programs, open source plans)

## Acceptance Criteria
- [ ] 20+ entries with realistic dates and times
- [ ] Mix of all entry types
- [ ] Chronologically coherent story
- [ ] Each entry has title, description, type, and 1–3 tags
- [ ] Descriptions are 1–3 sentences, informative

## Dependencies
- Can start immediately

## Agent Notes
**Vertex AI**: Repetitive structured data generation — ideal for Google credits.
BODY
)" \
  "Stream 3: Content Population" \
  "agent:vertex-ai" "type:content" "priority:medium" "stream:3-content"

create_issue \
  "[3d] Review seed data for consistency and brand voice" \
  "$(cat <<'BODY'
## Description
Editorial review of all generated content (blog articles, stream entries, product descriptions) to ensure consistency, accuracy, and brand voice.

## Review Checklist
- [ ] All product descriptions are accurate and compelling
- [ ] Blog articles are technically credible
- [ ] Stream entries tell a coherent story chronologically
- [ ] Brand voice is consistent (technical but approachable)
- [ ] No contradictions between content pieces
- [ ] Dates and timelines are internally consistent
- [ ] Tags and categories are used consistently

## Dependencies
- Blocked by: #12, #13, #14 (all 3a–3c issues)

## Agent Notes
**Claude Code**: Editorial QA — ensure brand voice consistency across all content.
BODY
)" \
  "Stream 3: Content Population" \
  "agent:claude-code" "type:qa" "priority:high" "stream:3-content"

# --- Stream 4: Workflow Integration ---

create_issue \
  "[4a] Design webhook API route architecture" \
  "$(cat <<'BODY'
## Description
Design the architecture for webhook-driven content automation. Document:
- API route structure
- Authentication/signature verification approach
- Payload-to-Sanity-document mapping
- Error handling and retry strategy

## Deliverables
- [ ] Architecture document (can be a markdown file or issue comment)
- [ ] API route file structure planned
- [ ] Security model defined (webhook signature verification)
- [ ] Rate limiting approach defined

## Dependencies
- Blocked by: Stream 1 complete

## Agent Notes
**Claude Code**: Architecture design — security-critical decisions.
BODY
)" \
  "Stream 4: Workflow Integration" \
  "agent:claude-code" "type:architecture" "priority:high" "stream:4-integrations"

create_issue \
  "[4b] Build GitHub webhook handler (/api/webhooks/github)" \
  "$(cat <<'BODY'
## Description
Create a Next.js API route that receives GitHub webhooks and auto-creates stream entries in Sanity.

## Events to handle:
- `release` → Stream entry of type "release"
- `pull_request` (merged, with `stream-worthy` label) → Stream entry of type "engineering"
- `deployment_status` (success) → Stream entry of type "milestone"

## Acceptance Criteria
- [ ] API route at `/api/webhooks/github`
- [ ] GitHub webhook signature verification (HMAC SHA-256)
- [ ] Correct Sanity document creation for each event type
- [ ] Meaningful title and description auto-generated from payload
- [ ] Tags auto-generated from repo name, PR labels, etc.
- [ ] Returns proper HTTP status codes
- [ ] Error logging

## Dependencies
- Blocked by: #16 ([4a] Architecture design)

## Agent Notes
**Claude Code**: Security-critical — webhook signature verification, payload sanitization.
BODY
)" \
  "Stream 4: Workflow Integration" \
  "agent:claude-code" "type:feature" "priority:high" "stream:4-integrations"

create_issue \
  "[4c] Build generic stream entry API (/api/stream)" \
  "$(cat <<'BODY'
## Description
Create a general-purpose API route for creating stream entries from any source (CLI, Slack bot, other integrations).

## Acceptance Criteria
- [ ] POST `/api/stream` creates a new stream entry in Sanity
- [ ] Accepts JSON body: `{ title, description, type, tags }`
- [ ] Bearer token authentication
- [ ] Input validation (required fields, enum types)
- [ ] Returns created document ID
- [ ] Rate limiting

## Dependencies
- Blocked by: #16 ([4a] Architecture design), pattern established by #17 ([4b])

## Agent Notes
**Copilot**: Follows the pattern established by the GitHub webhook handler.
BODY
)" \
  "Stream 4: Workflow Integration" \
  "agent:copilot" "type:feature" "priority:high" "stream:4-integrations"

create_issue \
  "[4d] Build GitHub Action for auto-posting stream entries" \
  "$(cat <<'BODY'
## Description
Create a reusable GitHub Action workflow (`.github/workflows/stream-post.yml`) that posts stream entries on key events.

## Triggers:
- On release published
- On PR merged with `stream-worthy` label
- Manual dispatch (for ad-hoc entries)

## Acceptance Criteria
- [ ] Workflow file at `.github/workflows/stream-post.yml`
- [ ] Posts to the stream API endpoint
- [ ] Uses repository secrets for API token
- [ ] Manual dispatch supports custom title/description inputs
- [ ] Tested with a dry-run option

## Dependencies
- Blocked by: #18 ([4c] Stream entry API)

## Agent Notes
**Vertex AI**: YAML workflow generation — good use of Google credits.
BODY
)" \
  "Stream 4: Workflow Integration" \
  "agent:vertex-ai" "type:feature" "priority:medium" "stream:4-integrations"

create_issue \
  "[4e] PR Review: All API routes (security audit)" \
  "$(cat <<'BODY'
## Description
Security-focused review of all API routes and workflow integrations.

## Review Checklist
- [ ] Webhook signature verification is correct and timing-safe
- [ ] No secrets exposed in client-side code
- [ ] Input validation on all endpoints
- [ ] Rate limiting configured
- [ ] Error responses don't leak internal details
- [ ] CORS configuration is appropriate
- [ ] Environment variables documented
- [ ] GitHub Action secrets are properly scoped

## Dependencies
- Blocked by: #17, #18, #19 (all 4b–4d issues)

## Agent Notes
**Claude Code**: Security audit — verify signatures, auth, input validation.
BODY
)" \
  "Stream 4: Workflow Integration" \
  "agent:claude-code" "type:qa" "priority:high" "stream:4-integrations"

# --- Stream 5: Deploy & Polish ---

create_issue \
  "[5a] Configure Vercel environment and deployment" \
  "$(cat <<'BODY'
## Description
Set up Vercel deployment configuration with proper environment variables for production and preview.

## Acceptance Criteria
- [ ] `vercel.json` configured (if needed)
- [ ] Environment variables documented for Vercel dashboard
- [ ] Preview deployments work with draft Sanity content
- [ ] Production deployment uses published Sanity content
- [ ] Custom domain configuration documented

## Dependencies
- Blocked by: Stream 1, Stream 2

## Agent Notes
**Claude Code**: Env var setup, preview vs production config.
BODY
)" \
  "Stream 5: Deploy & Polish" \
  "agent:claude-code" "type:config" "priority:high" "stream:5-deploy"

create_issue \
  "[5b] Add RSS feed API route" \
  "$(cat <<'BODY'
## Description
Create API routes that generate RSS feeds for the blog and progress stream.

## Acceptance Criteria
- [ ] `/feed.xml` or `/api/rss` returns valid RSS 2.0 XML for blog posts
- [ ] `/stream/feed.xml` or similar for stream entries
- [ ] Feeds include title, description, link, pubDate
- [ ] Valid XML (passes W3C feed validator)
- [ ] `<link>` tags in HTML head for feed discovery

## Dependencies
- Blocked by: Stream 2 (pages need to be CMS-driven first)

## Agent Notes
**Copilot**: Well-defined pattern, XML generation.
BODY
)" \
  "Stream 5: Deploy & Polish" \
  "agent:copilot" "type:feature" "priority:medium" "stream:5-deploy"

create_issue \
  "[5c] Add sitemap generation" \
  "$(cat <<'BODY'
## Description
Add automatic sitemap generation using Next.js built-in `sitemap.ts` support.

## Acceptance Criteria
- [ ] `src/app/sitemap.ts` generates sitemap from all routes
- [ ] Includes dynamic blog post URLs from Sanity
- [ ] Includes all static pages
- [ ] `robots.txt` references the sitemap
- [ ] Valid XML sitemap format

## Dependencies
- Blocked by: Stream 2

## Agent Notes
**Copilot**: Standard Next.js pattern.
BODY
)" \
  "Stream 5: Deploy & Polish" \
  "agent:copilot" "type:feature" "priority:medium" "stream:5-deploy"

create_issue \
  "[5d] Add Open Graph image generation" \
  "$(cat <<'BODY'
## Description
Create auto-generated Open Graph images for social sharing using Next.js `opengraph-image.tsx`.

## Acceptance Criteria
- [ ] Default OG image with Strug City branding and aurora gradient
- [ ] Dynamic OG images for blog posts (include title, category)
- [ ] Dynamic OG images for product pages
- [ ] Correct `<meta>` tags in page head
- [ ] Images render correctly when shared on Twitter/LinkedIn

## Dependencies
- Blocked by: Stream 2

## Agent Notes
**Vertex AI**: Image template design + data transformation.
BODY
)" \
  "Stream 5: Deploy & Polish" \
  "agent:vertex-ai" "type:feature" "priority:medium" "stream:5-deploy"

create_issue \
  "[5e] Final build verification and deploy" \
  "$(cat <<'BODY'
## Description
Final QA pass: verify everything works end-to-end, then deploy to production.

## Checklist
- [ ] `npm run build` passes with zero errors
- [ ] All pages render correctly with CMS data
- [ ] Sanity Studio is accessible and functional
- [ ] API routes respond correctly
- [ ] RSS feeds are valid
- [ ] Sitemap is valid
- [ ] OG images render correctly
- [ ] Mobile responsive on all pages
- [ ] Performance audit (Lighthouse score)
- [ ] Deploy to Vercel production
- [ ] Custom domain configured and working
- [ ] SSL certificate active

## Dependencies
- Blocked by: All previous streams

## Agent Notes
**Claude Code**: Final QA and deploy orchestration.
BODY
)" \
  "Stream 5: Deploy & Polish" \
  "agent:claude-code" "type:qa" "priority:high" "stream:5-deploy"

echo ""
echo "All issues created."
echo ""

# ==============================================================================
# Step 4: GitHub Project
# ==============================================================================
echo "--- Step 4: Creating GitHub Project ---"
echo ""

# Create the project
PROJECT_URL=$(gh project create --owner strugcity --title "Strug City Website v1" --format json 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('url',''))" 2>/dev/null || echo "")

if [ -n "$PROJECT_URL" ]; then
  echo "  Created project: $PROJECT_URL"

  # Get the project number from URL
  PROJECT_NUM=$(echo "$PROJECT_URL" | grep -oP '\d+$')

  # Add all open issues to the project
  echo "  Adding issues to project..."
  gh issue list --repo "$REPO" --state open --limit 100 --json number -q '.[].number' | while read -r issue_num; do
    gh project item-add "$PROJECT_NUM" --owner strugcity --url "https://github.com/$REPO/issues/$issue_num" 2>/dev/null \
      && echo "    Added issue #$issue_num" || true
  done
else
  echo "  Could not create project (may need org-level permissions)."
  echo "  Create it manually at: https://github.com/orgs/strugcity/projects/new"
  echo "  Then add issues with: gh project item-add <project-number> --owner strugcity --url <issue-url>"
fi

echo ""
echo "================================================"
echo "  Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Visit https://github.com/$REPO/issues to see all issues"
echo "  2. Visit https://github.com/$REPO/milestones to see milestones"
echo "  3. Set up the project board views (Kanban, By Stream, By Agent)"
echo "  4. Start with Stream 1 — Sanity CMS Foundation"
echo ""
