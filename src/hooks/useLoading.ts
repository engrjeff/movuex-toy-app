import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useLoading() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleBeginRouteChange = () => setIsLoading(true);
    const handleEndRouteChange = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleBeginRouteChange);

    router.events.on('routeChangeComplete', handleEndRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleBeginRouteChange);
      router.events.off('routeChangeComplete', handleEndRouteChange);
    };
  }, [router.events]);

  return isLoading;
}
