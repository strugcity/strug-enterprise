# Vercel Deployment Guide

Complete guide for deploying Strug City website to Vercel.

---

## Prerequisites

- GitHub repository: `strugcity/strug-enterprise`
- Vercel account (sign up at https://vercel.com)
- Sanity project with production dataset

---

## Environment Variables

These environment variables must be configured in the Vercel dashboard for both **Production** and **Preview** environments.

### Required Environment Variables

| Variable | Value | Where to Find | Environment |
|----------|-------|---------------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `ktfgvv39` | Sanity dashboard | Production + Preview |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity dashboard | Production + Preview |
| `SANITY_API_TOKEN` | `sk...` (read token) | Sanity dashboard → API → Tokens | Production + Preview |

### Getting Your Sanity API Token

1. Go to https://www.sanity.io/manage/project/ktfgvv39/api
2. Click **"+ Add API token"**
3. Name: `Vercel Production Deployment`
4. Permissions: **Viewer** (read-only)
5. Copy the token (starts with `sk...`)
6. Add to Vercel environment variables

---

## Deployment Steps

### 1. Connect GitHub Repository to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select `strugcity/strug-enterprise`
4. Vercel will auto-detect Next.js configuration

### 2. Configure Project Settings

**Framework Preset**: Next.js (auto-detected)
**Root Directory**: `./` (keep default)
**Build Command**: `npm run build` (auto-detected)
**Output Directory**: `.next` (auto-detected)
**Install Command**: `npm install` (auto-detected)

### 3. Add Environment Variables

In the Vercel deployment configuration screen:

1. Click **"Environment Variables"**
2. Add each variable from the table above:
   - Variable name
   - Value
   - Select environments: **Production**, **Preview**, **Development**
3. Click **"Add"** for each variable

### 4. Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Clone the repository
   - Install dependencies
   - Run `npm run build`
   - Deploy to production

### 5. Verify Deployment

Once deployed, verify:

- [ ] Homepage loads at `https://your-project.vercel.app`
- [ ] Blog posts appear (fetched from Sanity)
- [ ] Products page shows all products
- [ ] Stream page shows stream entries
- [ ] Blog detail pages work (e.g., `/blog/test`)
- [ ] Images load correctly via Sanity CDN
- [ ] No console errors in browser DevTools

---

## Custom Domain Configuration

### Add Custom Domain

1. Go to Vercel dashboard → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `strugcity.com`)
4. Follow DNS configuration instructions

### DNS Configuration

Vercel will provide DNS records to add:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Add these records in your domain registrar's DNS settings.

### SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. Your site will be available at:
- `https://strugcity.com`
- `https://www.strugcity.com`

---

## Preview Deployments

### Automatic Preview Deployments

Every pull request and branch push creates a preview deployment:

- URL: `https://strug-enterprise-git-{branch}-{team}.vercel.app`
- Uses same environment variables as production
- Perfect for testing before merging

### Preview vs Production

**Current Setup**: Both preview and production use the same Sanity dataset (`production`).

**Future Enhancement** (Optional): Use separate datasets for preview vs production:

| Environment | Dataset | Token |
|-------------|---------|-------|
| Production | `production` | Read-only token |
| Preview | `preview` | Read-only token |

To implement:
1. Create `preview` dataset in Sanity
2. Update preview environment variables:
   - `NEXT_PUBLIC_SANITY_DATASET=preview`
3. Seed preview dataset with test content

---

## Deployment Monitoring

### Build Logs

View build logs in Vercel dashboard:
- Go to **Deployments**
- Click on a deployment
- View **Build Logs** and **Function Logs**

### Common Build Errors

#### Error: "Module not found"
**Fix**: Ensure all dependencies are in `package.json` and committed to Git.

#### Error: "SANITY_API_TOKEN is not defined"
**Fix**: Add environment variable in Vercel dashboard → Settings → Environment Variables.

#### Error: "Type error: ..."
**Fix**: Run `npm run build` locally first to catch TypeScript errors before deploying.

---

## Redeployment

### Trigger Redeployment

To redeploy without code changes:

1. Go to Vercel dashboard → **Deployments**
2. Click on latest deployment
3. Click **"..."** menu → **"Redeploy"**

### Automatic Redeployment on Content Changes

To automatically redeploy when Sanity content changes:

1. In Sanity Studio, go to **API** → **Webhooks**
2. Click **"+ Create webhook"**
3. Configure:
   - Name: `Vercel Production Deploy`
   - URL: `https://api.vercel.com/v1/integrations/deploy/{hook-id}`
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
4. Get the Vercel deploy hook URL:
   - Vercel dashboard → Settings → Git → Deploy Hooks
   - Create hook: `Sanity Content Update`
   - Copy the generated URL
5. Paste URL into Sanity webhook configuration

Now, every time you publish content in Sanity, Vercel will automatically rebuild and deploy!

---

## Rollback

If a deployment has issues, you can instantly rollback:

1. Go to Vercel dashboard → **Deployments**
2. Find a previous working deployment
3. Click **"..."** menu → **"Promote to Production"**

Your site will instantly switch to that deployment (no rebuild needed).

---

## Environment-Specific Configuration

### Production Environment

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=ktfgvv39
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk... (read-only token)
```

### Preview Environment (Optional)

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=ktfgvv39
NEXT_PUBLIC_SANITY_DATASET=preview
SANITY_API_TOKEN=sk... (read-only token for preview dataset)
```

### Development Environment

Local `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=ktfgvv39
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk... (write token for local seeding)
```

---

## Performance Optimization

### Static Site Generation (SSG)

Our site uses SSG for maximum performance:

- **Home**: Static, revalidates on deploy
- **Blog Listing**: Static, revalidates on deploy
- **Blog Detail**: SSG with `generateStaticParams` (builds all blog posts at deploy time)
- **Products**: Static, revalidates on deploy
- **Stream**: Static, revalidates on deploy

### Caching Strategy

Next.js automatically caches:
- Static pages (cached indefinitely until redeploy)
- API routes (no caching by default)
- Images (optimized and cached via Vercel CDN)

---

## Troubleshooting

### Issue: Blog posts don't appear

**Possible Causes**:
1. Sanity API token not set in Vercel
2. Network firewall blocking Sanity API
3. No published blog posts in Sanity

**Fix**:
1. Check environment variables in Vercel dashboard
2. Check build logs for Sanity connection errors
3. Verify content exists in Sanity Studio

### Issue: Images don't load

**Possible Causes**:
1. Image URL builder not configured
2. CORS issues (unlikely with Sanity)

**Fix**:
1. Check `src/lib/sanity.ts` has `urlFor()` function
2. Verify images have URLs in Sanity Studio

### Issue: Build fails

**Fix**:
1. Run `npm run build` locally to reproduce
2. Check TypeScript errors with `npm run build`
3. Check build logs in Vercel dashboard

---

## Next Steps

After successful deployment:

1. ✅ Verify all pages load correctly
2. ✅ Test blog post navigation
3. ✅ Verify images display
4. ✅ Check mobile responsiveness
5. ✅ Run Lighthouse audit
6. ✅ Add custom domain (optional)
7. ✅ Set up Sanity webhook for auto-deploy (optional)

---

## References

- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Sanity Webhooks: https://www.sanity.io/docs/webhooks

---

**Questions?** Check the Vercel dashboard build logs or Sanity API status page.

**Happy deploying!** 🚀
