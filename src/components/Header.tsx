import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import SearchField from './SearchField';
import Brand from './Brand';
import NavLinks from './NavLinks';
import MobileNavigation from './MobileNavigation';

function Header() {
  return (
    <Box
      component='header'
      py={2}
      borderBottom={1}
      borderColor='divider'
      position='sticky'
      top={0}
      bgcolor={(theme) => theme.palette.background.paper}
      zIndex={(theme) => theme.zIndex.appBar}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: {
            sm: 'flex-start',
            md: 'space-between',
          },
        }}
      >
        <MobileNavigation />
        <Brand />
        <NavLinks />
        <SearchField />
      </Container>
    </Box>
  );
}

export default Header;
