# Sanity CI Firewall Fix - Diagnostic & Resolution

## Root Cause

GitHub Copilot coding agent runs in a **sandboxed environment with firewall restrictions** for security. When Copilot tries to build/test code that connects to external APIs (like Sanity), the firewall blocks those connections by default.

## Why This Happens

1. **Copilot creates a PR** with Sanity integration code
2. **Copilot tests the code** by running `npm run build` or similar
3. **Next.js build** tries to fetch data from Sanity during static generation
4. **Firewall blocks** the connection to `ktfgvv39.apicdn.sanity.io`
5. **Build warning appears** in the PR description

## Domains Used by Sanity

Your Sanity project uses **two domains**:

1. **CDN Domain** (default, used most): `ktfgvv39.apicdn.sanity.io`
   - Used when `useCdn: true` (line 14 in `src/lib/sanity.ts`)
   - Faster, cached responses
   - **This is what's being blocked**

2. **API Domain** (non-CDN): `ktfgvv39.api.sanity.io`
   - Used when `useCdn: false` (preview client)
   - Direct, non-cached access
   - Also needs to be allowlisted

## Solution Checklist

### ✅ Already Done (Per Your Screenshots)

1. ✅ Added `ktfgvv39.apicdn.sanity.io` to Copilot allowlist
2. ✅ Added `NEXT_PUBLIC_SANITY_PROJECT_ID` secret
3. ✅ Added `NEXT_PUBLIC_SANITY_DATASET` secret

### 🔧 To Complete

Add the **second domain** to your Copilot allowlist:

1. Go to: https://github.com/strugcity/strug-enterprise/settings/copilot/coding_agent
2. In the "Custom allowlist" section, add:
   ```
   ktfgvv39.api.sanity.io
   ```
3. Click "Save changes"

### Why Add Both Domains?

- **During builds**: Next.js might use either endpoint depending on the request
- **Image URLs**: The image URL builder might use different endpoints
- **Caching**: If CDN fails, it might fall back to the API endpoint
- **Better safe than sorry**: Both are needed for complete coverage

## Verification Steps

### 1. Local Test (Already Passed ✅)

Run the test script:
```bash
node test-sanity-connection.js
```

Expected output:
```
✅ CDN endpoint working!
✅ API endpoint working!
```

### 2. Test in Next.js Build

```bash
npm run build
```

Expected: Build should complete without Sanity connection errors

### 3. Test After Allowlist Update

After adding both domains to the Copilot allowlist:

1. Create a new test PR (or rerun Copilot on an existing PR)
2. Watch for the firewall warning in the PR description
3. It should be **gone** ✅

## Alternative Solution: Disable CDN for Builds

If you still have issues, you can disable CDN during builds:

```typescript
// src/lib/sanity.ts
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Only use CDN in production
});
```

This makes builds use `api.sanity.io` instead of `apicdn.sanity.io`.

## Expected Results

After completing the checklist:

- ✅ Copilot PRs should build successfully
- ✅ No firewall warnings in PR descriptions
- ✅ All Sanity data fetches work during CI/CD
- ✅ Local development continues to work normally

## Troubleshooting

If you still see warnings:

1. **Check secrets are set**: Go to Settings > Secrets and variables > Actions
2. **Verify domain spelling**: Must be exact: `ktfgvv39.apicdn.sanity.io` and `ktfgvv39.api.sanity.io`
3. **Clear Copilot cache**: Create a new PR to test with fresh cache
4. **Check build logs**: Look for specific connection errors in workflow runs

## Files Modified

- ✅ `test-sanity-connection.js` - Diagnostic test script (new)
- ✅ `SANITY_CI_FIX.md` - This documentation (new)

## Next Steps

1. Add `ktfgvv39.api.sanity.io` to Copilot allowlist
2. Wait for next Copilot PR or create a test PR
3. Verify firewall warning is gone
4. Delete `test-sanity-connection.js` (no longer needed)
