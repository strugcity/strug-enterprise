# Setting Up Gemini in VS Code via Roo Cline

## Prerequisites

- ✅ Roo Cline extension installed in VS Code
- 🔧 Google Cloud account with Vertex AI access

---

## Step 1: Set Up Google Cloud / Vertex AI

### 1.1 Create Google Cloud Project (if you don't have one)

1. Go to: https://console.cloud.google.com/
2. Click **"Select a project"** → **"New Project"**
3. Name it: `strug-city` or similar
4. Click **Create**

### 1.2 Enable Vertex AI API

1. Go to: https://console.cloud.google.com/apis/library/aiplatform.googleapis.com
2. Select your project
3. Click **"Enable"**
4. Wait for API to be enabled (~1 minute)

### 1.3 Create Service Account

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click **"+ Create Service Account"**
3. Fill in:
   - **Name**: `roo-cline-gemini`
   - **Description**: "Service account for Roo Cline to access Gemini/Vertex AI"
4. Click **"Create and Continue"**

### 1.4 Grant Permissions

In the "Grant this service account access to project" step:

1. Click **"Select a role"**
2. Search for and select: **"Vertex AI User"**
3. Click **"Continue"**
4. Click **"Done"**

### 1.5 Create Service Account Key

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Choose **JSON** format
5. Click **"Create"**
6. Save the JSON file securely (e.g., `C:\Users\rktra\.config\gcloud\roo-cline-key.json`)

⚠️ **IMPORTANT**: Keep this key secure! Don't commit it to Git!

---

## Step 2: Configure Roo Cline in VS Code

### 2.1 Open Roo Cline Settings

1. Open VS Code
2. Press `Ctrl+Shift+P` (Command Palette)
3. Type: **"Roo Cline: Open Settings"**
4. Or click the Roo Cline icon in the sidebar

### 2.2 Add Vertex AI / Gemini Provider

In the Roo Cline settings:

1. **Provider**: Select **"Google Vertex AI"** or **"Google Gemini"**
2. **Model**: Choose your preferred model:
   - `gemini-2.0-flash-exp` (fastest, recommended)
   - `gemini-1.5-pro` (most capable)
   - `gemini-1.5-flash` (fast, good balance)
3. **Project ID**: Your Google Cloud project ID (find it in Cloud Console)
4. **Region**: Choose closest region (e.g., `us-central1`, `us-east1`)

### 2.3 Set Up Authentication

**Method 1: Service Account Key (Recommended for Roo Cline)**

1. In Roo Cline settings, find **"Google Application Credentials"**
2. Set path to your JSON key file:
   ```
   C:\Users\rktra\.config\gcloud\roo-cline-key.json
   ```

**Method 2: Application Default Credentials (Alternative)**

1. Install Google Cloud SDK: https://cloud.google.com/sdk/docs/install
2. Run in terminal:
   ```bash
   gcloud auth application-default login
   gcloud config set project YOUR_PROJECT_ID
   ```

---

## Step 3: Test the Setup

### 3.1 Open Roo Cline

1. Click the Roo Cline icon in VS Code sidebar
2. You should see the chat interface

### 3.2 Test Gemini

Try a simple prompt:
```
Hello! Can you help me understand this project?
```

If it works, you'll get a response from Gemini! 🎉

### 3.3 Test Code Assistance

Try asking Roo Cline to help with code:
```
Can you help me create a new React component for displaying user profiles?
```

---

## Step 4: Configure for Strug City Project

### 4.1 Add Project Context (Optional)

Create a `.roo-cline` or `.clinerules` file in your project root:

```markdown
# Strug City Project Context

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Sanity CMS

## Coding Standards
- Use TypeScript strict mode
- Prefer server components
- Use Tailwind CSS classes only
- Follow our aurora color palette

## Key Files
- `GEMINI.md` - Full project context
- `src/app/` - Next.js pages
- `src/lib/` - Utilities and Sanity client
```

### 4.2 Set Custom Instructions (Optional)

In Roo Cline settings, add custom instructions:
```
You are helping build the Strug City website.
Use TypeScript, Next.js App Router, and Tailwind CSS.
Follow the conventions in GEMINI.md.
Use our aurora color palette for styling.
```

---

## Alternative: Use Gemini via API Key (Simpler)

If you don't want to set up Vertex AI, you can use Gemini directly via API key:

### 1. Get Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key

### 2. Configure Roo Cline

1. **Provider**: Select **"Google Gemini"**
2. **API Key**: Paste your Gemini API key
3. **Model**: `gemini-2.0-flash-exp` or `gemini-1.5-pro`

This is easier but has lower rate limits than Vertex AI.

---

## Troubleshooting

### Error: "Authentication failed"

- ✅ Check that your JSON key file path is correct
- ✅ Verify the service account has "Vertex AI User" role
- ✅ Make sure Vertex AI API is enabled in your project

### Error: "Model not found"

- ✅ Verify your region supports the model (use `us-central1`)
- ✅ Try a different model like `gemini-1.5-flash`

### Error: "Rate limit exceeded"

- ✅ Vertex AI has higher limits than the free API
- ✅ Check your Google Cloud quotas
- ✅ Wait a few minutes and try again

---

## Cost Considerations

### Gemini API (Free Tier)
- **Free**: 15 requests/minute, 1500 requests/day
- **Good for**: Personal projects, testing

### Vertex AI (Pay-as-you-go)
- **Gemini 1.5 Flash**: ~$0.0001 per 1K characters
- **Gemini 1.5 Pro**: ~$0.001 per 1K characters
- **Gemini 2.0 Flash**: ~$0.0001 per 1K characters
- **Good for**: Production use, higher limits

**Typical usage for coding**: $1-5/month for moderate use

---

## Summary

✅ **For GitHub**: Already set up! Use `@gemini-cli` in issues/PRs
✅ **For VS Code**:
1. Install Roo Cline ✅ (Done!)
2. Get Google Cloud credentials
3. Configure in Roo Cline settings
4. Start coding with Gemini assistance!

---

## Next Steps

1. **Choose your setup**: Vertex AI (recommended) or API Key (simpler)
2. **Get credentials**: Follow Step 1 above
3. **Configure Roo Cline**: Follow Step 2 above
4. **Test it**: Try Step 3 above
5. **Start building**: Use Gemini to help with Strug City development!

**Questions?** The Roo Cline extension has good documentation in VS Code (press F1 → "Roo Cline: Help")
