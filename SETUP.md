# StyleSync Setup Guide

This guide will help you set up StyleSync with Supabase backend and deploy it to Netlify or Vercel.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available)
- A Netlify or Vercel account (free tier available)

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `stylesync`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

### 1.2 Set up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the entire content from `supabase-schema.sql` in this project
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema
5. Verify that all tables are created in the Table Editor

### 1.3 Set up Storage Buckets

1. Go to Storage in your Supabase dashboard
2. Create two new buckets:
   - `avatars` (for user profile pictures)
   - `items` (for clothing item images)
3. Set both buckets to "Public" for easy access
4. Configure RLS policies for both buckets (they should already be set up by the schema)

### 1.4 Configure Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your site URL:
   - For development: `http://localhost:5173`
   - For production: `https://your-domain.com`
3. Add redirect URLs:
   - `http://localhost:5173/home` (development)
   - `https://your-domain.com/home` (production)
4. Enable email confirmations (optional but recommended)
5. Configure OAuth providers (Google, Apple) if desired:
   - Go to Authentication > Providers
   - Enable Google/Apple and configure with your app credentials

### 1.5 Get API Keys

1. Go to Settings > API in your Supabase dashboard
2. Copy the following values:
   - Project URL
   - Anon public key
3. Keep these safe - you'll need them for environment variables

## Step 2: Local Development Setup

### 2.1 Clone and Install

```bash
git clone <your-repo-url>
cd stylesync
npm install
```

### 2.2 Environment Variables

1. Copy `env.example` to `.env.local`:
```bash
cp env.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2.3 Start Development Server

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`

## Step 3: Deployment

### Option A: Netlify Deployment

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository
   - Select your repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Set Environment Variables**:
   - Go to Site settings > Environment variables
   - Add the following:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Deploy**:
   - Click "Deploy site"
   - Wait for deployment to complete
   - Your app will be available at `https://your-site-name.netlify.app`

5. **Update Supabase Settings**:
   - Go back to Supabase Authentication settings
   - Add your Netlify URL to Site URL and Redirect URLs

### Option B: Vercel Deployment

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**:
   - Add the following environment variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-project.vercel.app`

5. **Update Supabase Settings**:
   - Go back to Supabase Authentication settings
   - Add your Vercel URL to Site URL and Redirect URLs

## Step 4: Testing Your Setup

1. **Create Account**: Try signing up with a new account
2. **Add Items**: Go to Catalogue and add some clothing items
3. **Upload Images**: Test image upload functionality
4. **Create Outfits**: Try the outfit planning features
5. **Check Database**: Verify data is being saved in Supabase

## Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Check that your Supabase URL and keys are correct
   - Verify redirect URLs are set up properly
   - Make sure email confirmation is disabled for testing

2. **Image Upload Issues**:
   - Verify storage buckets are created and public
   - Check RLS policies are set up correctly
   - Ensure file size limits are appropriate

3. **Database Errors**:
   - Verify the schema was applied correctly
   - Check that RLS policies are enabled
   - Ensure user authentication is working

4. **Deployment Issues**:
   - Check environment variables are set correctly
   - Verify build commands and output directories
   - Check deployment logs for specific errors

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [Vite Documentation](https://vitejs.dev/guide/)
- Check [Netlify](https://docs.netlify.com/) or [Vercel](https://vercel.com/docs) documentation
- Create an issue in the repository for bugs or questions

## Next Steps

Once your app is deployed and working:

1. **Customize**: Modify the UI, add new features, or change the color scheme
2. **Scale**: Consider upgrading Supabase plan for more storage/bandwidth
3. **Monitor**: Set up analytics and error tracking
4. **Backup**: Set up database backups and monitoring

## Security Considerations

- Never commit `.env.local` or environment variables to version control
- Use strong database passwords
- Regularly update dependencies
- Monitor your Supabase usage and costs
- Set up proper CORS policies if needed
- Consider implementing rate limiting for production use
