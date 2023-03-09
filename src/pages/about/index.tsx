import { Box, Button, Container, Typography } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const AboutPage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>About Movuex</title>
      </Head>
      <Box display='flex' flexDirection='column' py={8} mt={4} gap={4}>
        <Typography component='h2' variant='h2'>
          What is{' '}
          <Typography component='span' variant='h2' color='primary' fontWeight='bold'>
            Movuex
          </Typography>
          ?
        </Typography>
        <Typography variant='h5' color='GrayText' maxWidth='70%'>
          Movuex is a toy app for exploring React, NextJS, Material UI, and TypeScript.
        </Typography>
        <Typography
          variant='h5'
          color='GrayText'
          sx={{
            '& > a': {
              textDecorationStyle: 'dotted',
              fontWeight: 'bold',
              color: (theme) => theme.palette.primary.main,
            },
          }}
        >
          Made by{' '}
          <a href='https://jeffsegovia.dev' target='_blank' referrerPolicy='no-referrer'>
            Jeff Segovia
          </a>
          .
        </Typography>
        <Box display='flex' gap={2}>
          <Button size='large' LinkComponent={Link} href='/'>
            Go back to home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;
