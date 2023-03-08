import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import AppLink from './AppLink';
import Link from 'next/link';
import SearchField from './SearchField';

function Header() {
  const router = useRouter();

  const activeRoute = router.pathname;

  return (
    <Box component='header' py={2} borderBottom={1} borderColor='divider'>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography component='h1' variant='h3'>
          <Link href='/' style={{ color: 'inherit', textDecoration: 'none' }}>
            Movuex
          </Link>
        </Typography>
        <SearchField />
        <Box component='nav'>
          <AppLink href='/' className={activeRoute === '/' ? 'active' : ''}>
            Home
          </AppLink>
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
      </Container>
    </Box>
  );
}

export default Header;
