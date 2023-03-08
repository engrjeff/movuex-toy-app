import { Stack, Typography } from '@mui/material';

function Footer() {
  return (
    <Stack
      component='footer'
      color='white'
      py={6}
      textAlign='center'
      borderTop='1px solid'
      borderColor='divider'
      gap={2}
    >
      <Typography variant='h4'>Movuex</Typography>
      <Typography>Made with ❤️ by Jeff</Typography>
      <Typography>Copyright &copy; {new Date().getFullYear()}</Typography>
    </Stack>
  );
}

export default Footer;
