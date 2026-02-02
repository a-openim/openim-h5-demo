# Cloudflare Pages Deployment Guide

This guide explains how to deploy the OpenIM H5 application to Cloudflare Pages.

## Prerequisites

1. **Wrangler CLI** - Install globally:
   ```bash
   npm install -g wrangler
   ```

2. **Cloudflare Account** - You need a Cloudflare account with Pages enabled

3. **Authentication** - Login to Cloudflare:
   ```bash
   wrangler login
   ```

## Deployment Scripts

Two deployment scripts are provided:

### Unix/Linux/macOS: `deploy-cloudflare.sh`
```bash
./deploy-cloudflare.sh
```

### Windows: `deploy-cloudflare.bat`
```cmd
deploy-cloudflare.bat
```

### Using npm script:
```bash
npm run deploy
```

## What the Script Does

1. **Checks Wrangler Installation** - Verifies Wrangler CLI is installed
2. **Verifies Authentication** - Ensures you're logged in to Cloudflare
3. **Installs Dependencies** - Runs `pnpm install` if needed
4. **Builds the Project** - Runs `pnpm run build` to create the production bundle
5. **Deploys to Cloudflare Pages** - Uploads the `dist` folder to Cloudflare Pages

## Configuration

The deployment script uses the following configuration (can be modified in the script):

- **Project Name**: `h5-openim`
- **Build Directory**: `dist`
- **Production Branch**: `main`

### Changing Project Name

Edit the script and modify the `PROJECT_NAME` variable:

```bash
PROJECT_NAME="your-project-name"
```

## Environment Detection

The script automatically detects the current Git branch:

- **Production Deployment**: When on `main` branch, deploys to production environment
- **Preview Deployment**: When on any other branch, deploys to preview environment

## Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
pnpm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=h5-openim
```

### Production Deployment

```bash
wrangler pages deploy dist --project-name=h5-openim --env=production
```

## Troubleshooting

### Wrangler not found
```bash
npm install -g wrangler
```

### Not logged in
```bash
wrangler login
```

### Build fails
Check that all dependencies are installed:
```bash
pnpm install
```

### Permission denied (Unix/Linux/macOS)
Make the script executable:
```bash
chmod +x deploy-cloudflare.sh
```

## Cloudflare Pages Configuration

For first-time deployment, you may need to create the project in Cloudflare:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click **Create application**
4. Select **Pages** tab
5. Choose **Upload assets** or connect to Git

After creating the project, use the project name in the deployment script.

## Build Output

The build process creates a `dist` directory containing:
- Optimized JavaScript bundles
- CSS files
- Static assets (images, fonts, etc.)
- `index.html` entry point

This entire directory is uploaded to Cloudflare Pages.

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Vite Build Configuration](https://vitejs.dev/guide/build.html)
