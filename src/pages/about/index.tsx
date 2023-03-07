import { Box, Button, Typography } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Movuex</title>
      </Head>
      <Box display='flex' flexDirection='column' alignItems='center' py={8} mt={4} gap={4}>
        <Typography component='h2' variant='h2'>
          What is{' '}
          <Typography component='span' variant='h2' color='primary' fontWeight='bold'>
            Movuex
          </Typography>
          ?
        </Typography>
        <Typography variant='h5' color='GrayText'>
          Movuex is a toy app for exploring React and NextJS. Made by Boss Jep
        </Typography>
        <Box display='flex' gap={2}>
          <Button size='large' LinkComponent={Link} href='/movies'>
            Go back to home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AboutPage;
