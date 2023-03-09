import Head from 'next/head';
import Link from 'next/link';

import { Stack, Typography, Button } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Stack alignItems='center' py={8} px={2}>
      <Head>
        <title>Movuex - 404 Not Found</title>
      </Head>
      <Typography variant='h1' fontWeight='bold'>
        404
      </Typography>
      <Typography mb={6} variant='h6'>
        The resource that you requested cannot be found
      </Typography>
      <Button LinkComponent={Link} href='/' size='large'>
        Back to Home
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
