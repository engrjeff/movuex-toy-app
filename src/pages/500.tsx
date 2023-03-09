import Head from 'next/head';
import Link from 'next/link';

import { Stack, Typography, Button } from '@mui/material';

const ServerErrorPage = () => {
  return (
    <Stack alignItems='center' py={8} px={2}>
      <Head>
        <title>Movuex - 500 Server Error</title>
      </Head>
      <Typography variant='h1' fontWeight='bold'>
        500
      </Typography>
      <Typography mb={6} variant='h6'>
        There is probably an error from the server
      </Typography>
      <Button LinkComponent={Link} href='/' size='large'>
        Back to Home
      </Button>
    </Stack>
  );
};

export default ServerErrorPage;
