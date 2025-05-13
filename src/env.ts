// Interface for environment variables
interface EnvVars {
  NEXT_PUBLIC_MODEL_NAME?: string;
  NEXT_PUBLIC_COMPANY_NAME?: string;
  NEXT_PUBLIC_API_URL?: string;
  NEXT_PUBLIC_MODEL_VERSION?: string;
  NODE_ENV?: string;
}

/**
 * Initialize window.ENV object with environment variables
 * This should be called in _app.tsx to make environment variables
 * available on the client-side
 */
export function initializeEnv(): void {
  if (typeof window !== 'undefined') {
    // Create ENV object if it doesn't exist
    window.ENV = window.ENV || {};
    
    // Set environment variables from Next.js public env vars
    const env: EnvVars = {
      NEXT_PUBLIC_MODEL_NAME: process.env.NEXT_PUBLIC_MODEL_NAME || 'june13525',
      NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Indai Co.',
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      NEXT_PUBLIC_MODEL_VERSION: process.env.NEXT_PUBLIC_MODEL_VERSION || 'Standard',
      NODE_ENV: process.env.NODE_ENV
    };
    
    // Assign to window.ENV
    Object.assign(window.ENV, env);
    
    console.log('Environment variables initialized:', window.ENV);
  }
}

// Type declaration for window.ENV
declare global {
  interface Window {
    ENV?: EnvVars;
  }
} 