import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import AppLink from './AppLink';

function NavLinks() {
  const router = useRouter();

  const activeRoute = router.pathname;

  return (
    <Box
      component='nav'
      ml='auto'
      mt={0.5}
      height='100%'
      gap={4}
      display={{ xs: 'none', md: 'flex' }}
    >
      <AppLink href='/movies' className={activeRoute === '/movies' ? 'active' : ''}>
        Movies
      </AppLink>
      <AppLink href='/tv-shows' className={activeRoute === '/tv-shows' ? 'active' : ''}>
        TV Shows
      </AppLink>
      <AppLink href='/about' className={activeRoute === '/about' ? 'active' : ''}>
        About
      </AppLink>
    </Box>
  );
}

export default NavLinks;
