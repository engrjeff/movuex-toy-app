import { Box, Button, Typography } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Movuex</title>
        <meta name='description' content='A simple project by jep' />
      </Head>
      <Box display='flex' flexDirection='column' alignItems='center' py={8} mt={4} gap={4}>
        <Typography component='h2' variant='h2'>
          Welcome to{' '}
          <Typography component='span' variant='h2' color='primary' fontWeight='bold'>
            Movuex
          </Typography>{' '}
          🎦
        </Typography>
        <Typography variant='h5' color='GrayText'>
          Grab a popcorn 🍿 and be translated to places you have never been to.
        </Typography>
        <Box display='flex' gap={2}>
          <Button size='large' LinkComponent={Link} href='/movies'>
            Browse Movies
          </Button>
          <Button size='large' variant='outlined' LinkComponent={Link} href='/tv-shows'>
            Browse TV Shows
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
