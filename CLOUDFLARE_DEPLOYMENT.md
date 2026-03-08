# Cloudflare Pages Deployment Guide

Your 3D Portfolio application is fully configured and ready to be deployed to Cloudflare Pages.

## Prerequisites
- Create a [Cloudflare Dashboard](https://dash.cloudflare.com/) account.
- Push your `d:\phython\Antigravity\portfolio` folder to a GitHub repository.

## Deployment Steps (via Cloudflare Dashboard)
1. Log in to your Cloudflare Dashboard.
2. Go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your newly created repository for this portfolio.
4. Use the following build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Cloudflare will automatically build your React+Tailwind application and provide you with a fast, global edge URL!

## To Work Locally
1. Navigate to the folder: `cd d:\phython\Antigravity\portfolio`
2. Run the development server: `npm run dev`
3. The portfolio will be available at `http://localhost:5173`.
