# Deployment Guide

## GitHub Repository
✅ Code has been pushed to: https://github.com/sakhawatalir/league_of_legends_dashboard_final

## Deploy to Vercel (Recommended)

### Option 1: Via Web Interface (Easiest)
1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Select the repository: `league_of_legends_dashboard_final`
5. Vercel will automatically detect Next.js settings
6. Click "Deploy"
7. Your site will be live in ~2 minutes!

### Option 2: Via CLI
1. Run `vercel --prod` in the project directory
2. Follow the prompts to authenticate
3. Deploy to production

## Environment Variables
If you need any environment variables, add them in Vercel's project settings:
- Go to your project on Vercel
- Settings → Environment Variables
- Add any required variables

## Post-Deployment
After deployment, Vercel will provide you with:
- A production URL (e.g., `your-project.vercel.app`)
- Automatic deployments on every push to main branch
- Preview deployments for pull requests

## Custom Domain (Optional)
1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

