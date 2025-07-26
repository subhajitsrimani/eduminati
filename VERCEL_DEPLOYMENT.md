# Vercel Deployment Guide for Eduminati

## Changes Made for Vercel Deployment

### 1. Centralized MongoDB Connection
- Created `/lib/mongodb.ts` to handle MongoDB connections with connection pooling
- This prevents connection limit issues on serverless platforms like Vercel

### 2. Updated API Routes
All API routes in `/app/api/` have been updated to:
- Import the centralized `connectDB` function from `@/lib/mongodb`
- Remove inline connection strings and connection logic
- Use environment variables for database configuration

### 3. Vercel Configuration
Created `vercel.json` with:
- Function timeout settings (30 seconds max duration)
- Optimized for Next.js API routes

## Environment Variables Required

Set these in your Vercel project settings:

```
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
DATABASE_NAME=Course1_c++ (optional, defaults to Course1_c++)
```

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update API routes for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure environment variables

3. **Environment Variables in Vercel**
   - Go to Project Settings > Environment Variables
   - Add the required MongoDB credentials

## API Routes Updated

- `/api/beginner` - Uses "Course1_c++" database
- `/api/basic` - Uses DATABASE_NAME env var or "default_database"
- `/api/intermediate` - Uses DATABASE_NAME env var or "Course1_c++"
- `/api/advanced` - Uses DATABASE_NAME env var or "default_db"
- `/api/expert` - Uses DATABASE_NAME env var or "default_database"
- `/api/courseData` - Uses DATABASE_NAME env var or "default_db"

## Key Differences from Original

1. **Connection Pooling**: The new setup uses a cached connection to prevent MongoDB connection limits
2. **Environment Variables**: Database names can now be configured via environment variables
3. **Error Handling**: Improved error messages for debugging
4. **Vercel Optimization**: Function timeouts and runtime settings optimized for Vercel

## Testing

After deployment, test each API endpoint:
- `https://your-app.vercel.app/api/beginner`
- `https://your-app.vercel.app/api/basic`
- `https://your-app.vercel.app/api/intermediate`
- `https://your-app.vercel.app/api/advanced`
- `https://your-app.vercel.app/api/expert`
- `https://your-app.vercel.app/api/courseData`

Each should return JSON data from MongoDB.
