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
      <Typography
        sx={{
          '& > a': {
            textDecorationStyle: 'dotted',
            fontWeight: 'bold',
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        Made with ❤️ by{' '}
        <a href='https://jeffsegovia.dev' target='_blank' referrerPolicy='no-referrer'>
          Jeff Segovia
        </a>
      </Typography>

      <Typography
        sx={{
          '& > a': {
            textDecorationStyle: 'dotted',
            fontWeight: 'bold',
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        Powered by{' '}
        <a href=' https://www.themoviedb.org/' target='_blank' referrerPolicy='no-referrer'>
          The Movie DB
        </a>
      </Typography>
      <Typography>Copyright &copy; {new Date().getFullYear()}</Typography>
    </Stack>
  );
}

export default Footer;
