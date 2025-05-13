import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { initializeEnv } from '../env';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize environment variables on the client-side
    initializeEnv();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
