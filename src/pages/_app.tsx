import Head from 'next/head';
import type { AppProps } from 'next/app';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import createEmotionCache from '@/lib/createEmotionCache';
import theme from '@/lib/theme';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta
          name='og:image'
          content='https://res.cloudinary.com/abide-in-the-vine/image/upload/v1678247987/jeff%20dev%20blog/banner_yvqp77.png'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main style={{ minHeight: '80vh' }}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}
