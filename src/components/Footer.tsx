import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component='footer' bgcolor='#111827' color='white' py={6} textAlign='center'>
      <Typography variant='h4'>Movuex</Typography>
      <Typography>Made with ❤️ by Jeff</Typography>
    </Box>
  );
}

export default Footer;
