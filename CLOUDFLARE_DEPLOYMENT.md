# Cloudflare Pages Deployment Guide

Your 3D Portfolio application is fully configured and ready to be deployed to Cloudflare Pages.

## Deployment Options

### Option 1: Via Cloudflare Dashboard (Recommended for Auto-Deploy)
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository for this portfolio.
4. Use the following build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Cloudflare will automatically build your application on every push!

### Option 2: Via Wrangler (Terminal Deployment)
If you prefer deploying from your code editor without pushes, use the **Wrangler** CLI:
1.  **Authorize Wrangler**:
    ```bash
    npx wrangler login
    ```
2.  **Build your project**:
    ```bash
    npm run build
    ```
3.  **Deploy to Cloudflare Pages**:
    ```bash
    npx wrangler pages deploy dist
    ```

## To Work Locally
1. Navigate to the folder: `cd d:\phython\Antigravity\portfolio`
2. Run the development server: `npm run dev`
3. The portfolio will be available at `http://localhost:5173`.
