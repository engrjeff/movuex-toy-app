import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import NProgress from "nprogress";
import "@/styles/nprogress.css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import createEmotionCache from "@/lib/createEmotionCache";
import theme from "@/lib/theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

NProgress.configure({ showSpinner: false });

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function App(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events]);

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
        <main style={{ minHeight: "80vh" }}>
          {getLayout(<Component {...pageProps} />)}
        </main>
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}
