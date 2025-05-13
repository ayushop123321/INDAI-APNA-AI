# LocalCoder AI Frontend Debugging Guide

This guide helps you diagnose and fix common issues with the LocalCoder AI frontend.

## Connection Issues

### Backend API Not Reachable

If you see errors like "Failed to fetch" or "Network Error":

1. **Check if backend is running**
   - Open http://localhost:8000/api/health in your browser
   - If it doesn't load, the backend is not running or is on a different port

2. **Check your environment configuration**
   - Verify that `.env.local` contains the correct backend URL
   - Default is `NEXT_PUBLIC_API_URL=http://localhost:8000`

3. **Check for CORS issues**
   - Open browser developer tools (F12) and look for CORS errors in the console
   - If present, ensure the backend has CORS enabled for your frontend URL

## Rendering Issues

### Components Not Displaying Correctly

1. **Clear browser cache**
   - Press Ctrl+F5 or Cmd+Shift+R to force reload without cache

2. **Check for JavaScript errors**
   - Open browser developer tools (F12)
   - Look for errors in the Console tab

3. **Verify npm packages are installed correctly**
   - Run `npm install` again to ensure all dependencies are properly installed

## Model-related Issues

### Model Status Always Shows as Not Loaded

1. **Check backend logs**
   - Look for error messages in the backend terminal

2. **Verify model files exist**
   - Check if model files are in the correct location on the backend

3. **Check model health endpoint**
   - Access http://localhost:8000/api/models/info in your browser
   - Verify the response matches what you expect

## Performance Issues

### Frontend Feels Slow or Unresponsive

1. **Check browser resources**
   - Open browser task manager (Shift+Esc in Chrome)
   - Look for high CPU or memory usage

2. **Optimize code editor**
   - Reduce code editor height if displaying large amounts of code
   - Disable minimap for very large files

3. **Check network tab**
   - Look for slow API responses in the Network tab of developer tools
   - Large model responses may take time to process

## Development-specific Issues

### Changes Not Reflecting

1. **Check if hot reload is working**
   - Make a simple change to see if it automatically updates
   - If not, restart the development server

2. **TypeScript errors**
   - Run `npm run lint` to check for TypeScript errors
   - Fix any type issues that appear

3. **Module resolution issues**
   - Check import paths (case-sensitive on some systems)
   - Ensure module names are correct in import statements

## Getting Advanced Help

If you've tried the steps above and still have issues:

1. **Generate a detailed error report**
   ```bash
   # From the frontend directory
   npm list > npm-packages.txt
   npm run build > build-log.txt
   ```

2. **Capture error information**
   - Screenshot any error messages
   - Copy console errors from browser developer tools
   - Note the exact steps to reproduce the issue

3. **Submit an issue**
   - Include your environment information (OS, browser, Node.js version)
   - Attach the generated logs and error details
   - Describe what you've already tried 