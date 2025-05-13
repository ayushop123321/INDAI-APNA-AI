# LocalCoder AI Frontend Installation Guide

This document provides step-by-step instructions to set up the LocalCoder AI frontend on your system.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.x or later)
- npm (v8.x or later) or yarn
- Backend server running (see backend documentation)

## Installation Steps

### 1. Clone the Repository

If you haven't already, clone the LocalCoder AI repository:

```bash
git clone https://github.com/your-username/localcoder-ai.git
cd localcoder-ai
```

### 2. Install Dependencies

Navigate to the frontend directory and install the required dependencies:

```bash
cd frontend
npm install
```

### 3. Configure Environment

Create a `.env.local` file in the frontend directory:

```bash
# Windows
copy .env.example .env.local

# Linux/macOS
cp .env.example .env.local
```

Edit the `.env.local` file to configure the backend API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Start the Development Server

Start the frontend development server:

```bash
npm run dev
```

The frontend should now be running at http://localhost:3000.

## Windows Quick Start

On Windows, you can simply run the included batch file:

```bash
start.bat
```

This script will automatically install dependencies if needed and start the development server.

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   - Solution: Run `npm install` to install all dependencies.

2. **Connection issues with the backend**
   - Check that your backend server is running
   - Verify the URL in `.env.local` matches your backend configuration

3. **Page not loading properly**
   - Clear your browser cache
   - Try using a different browser

### Getting Help

If you encounter any issues not covered here, please:
1. Check the project documentation
2. Look for similar issues in the project repository
3. Create a new issue with details about your problem

## Next Steps

After installation, see `README.md` for usage information and features. 