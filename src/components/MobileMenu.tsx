import { useRouter } from 'next/router';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/LiveTv';
import AboutIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useTheme } from '@mui/material/styles';

import Brand from './Brand';
import AppLink from './AppLink';
import { useMobileNavigation } from './MobileNavigation';

function MobileMenu() {
  const theme = useTheme();
  const router = useRouter();

  const { open, close } = useMobileNavigation();

  const activeRoute = router.pathname;

  const getStyle = (route: string) =>
    activeRoute === route ? { bgcolor: theme.palette.primary.main } : undefined;

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={close}
      PaperProps={{
        sx: {
          width: {
            xs: 250,
            sm: 270,
          },
        },
      }}
    >
      <Stack component='nav' height='100%' bgcolor='background.paper'>
        <Stack py={2} px={2} gap={2}>
          <Stack
            onClick={close}
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Brand />
            <IconButton size='small' edge='end' onClick={close} aria-label='close menu'>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography>Grab your popcorn 🍿 now!</Typography>
        </Stack>
        <Divider />
        <List onClick={close}>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={AppLink} href='/' sx={getStyle('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={AppLink} href='/movies' sx={getStyle('/movies')}>
              <ListItemIcon>
                <MovieIcon />
              </ListItemIcon>
              <ListItemText primary='Movies' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={AppLink} href='/tv-shows' sx={getStyle('/tv-shows')}>
              <ListItemIcon>
                <TvIcon />
              </ListItemIcon>
              <ListItemText primary='TV Shows' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={AppLink} href='/about' sx={getStyle('/about')}>
              <ListItemIcon>
                <AboutIcon />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItemButton>
          </ListItem>
        </List>

        <ListItem disablePadding sx={{ mt: 'auto', mb: 2 }}>
          <ListItemButton
            LinkComponent='a'
            href='https://github.com/engrjeff/movuex-toy-app'
            target='_blank'
            referrerPolicy='no-referrer'
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary='Github Repo' />
          </ListItemButton>
        </ListItem>
      </Stack>
    </Drawer>
  );
}

export default MobileMenu;
