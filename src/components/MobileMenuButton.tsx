import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMobileNavigation } from './MobileNavigation';

function MobileMenuButton() {
  const { toggle } = useMobileNavigation();

  return (
    <IconButton
      aria-label='open menu'
      onClick={toggle}
      sx={{
        display: {
          md: 'none',
          sm: 'inline-flex',
        },
      }}
    >
      <MenuIcon />
    </IconButton>
  );
}

export default MobileMenuButton;
