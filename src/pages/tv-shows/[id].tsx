import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { ParsedUrlQuery } from 'querystring';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getTvShowById } from '@/features/tv/service';
import { TvShowDetail } from '@/features/tv/types';
import AppLink from '@/components/AppLink';
import useLoading from '@/hooks/useLoading';
import AppLoadingIndicator from '@/components/AppLoadingIndicator';
import BackButton from '@/components/BackButton';
import Banner from '@/components/Banner';

interface TvShowDetailPageProps {
  tvShow: TvShowDetail;
}

const TvShowDetailPage: NextPage<TvShowDetailPageProps> = ({ tvShow }) => {
  const isLoading = useLoading();

  return (
    <>
      <Head>
        <title>{tvShow.name}</title>
      </Head>
      {isLoading ? (
        <AppLoadingIndicator />
      ) : (
        <>
          <Container>
            <BackButton backTo='/tv-shows' />
          </Container>
          <Banner imagePath={tvShow.backdrop_path}>
            <Container sx={{ display: 'flex', gap: 6 }}>
              <Box sx={{ position: 'relative' }}>
                <Image
                  src={tvShow.poster_path}
                  alt={tvShow.name}
                  height={330}
                  width={220}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </Box>
              <Stack gap={2} alignItems='flex-start'>
                <Button
                  LinkComponent='a'
                  href={tvShow.homepage}
                  target='_blank'
                  referrerPolicy='no-referrer'
                  endIcon={<OpenInNewIcon />}
                >
                  Go to Page
                </Button>
                <Typography component='h2' variant='h3'>
                  {tvShow.name}
                </Typography>
                <Typography color='orange' fontWeight={600}>
                  IMDB: {tvShow.vote_average}
                </Typography>
                <Typography>{tvShow.overview}</Typography>
                <Typography>
                  <Typography component='span' fontWeight='bold'>
                    First Air Date:{' '}
                  </Typography>
                  {tvShow.first_air_date}
                </Typography>
                <Typography>
                  <Typography component='span' fontWeight='bold'>
                    Episode Runtime:{' '}
                  </Typography>
                  {tvShow.episode_run_time} minutes
                </Typography>
                <Typography>
                  <Typography component='span' fontWeight='bold'>
                    Genre:{' '}
                  </Typography>
                  {tvShow.genres.map((g) => g.name).join(', ')}
                </Typography>
              </Stack>
            </Container>
          </Banner>
        </>
      )}
    </>
  );
};

interface GetParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<TvShowDetailPageProps> = async (context) => {
  const { id } = context.params as GetParams;

  const tvShow = await getTvShowById(id);

  if (!tvShow)
    return {
      notFound: true,
    };

  return {
    props: {
      tvShow,
    },
  };
};

export default TvShowDetailPage;
