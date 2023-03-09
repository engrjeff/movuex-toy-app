import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { ParsedUrlQuery } from 'querystring';

import { Box, Container, Stack, Typography } from '@mui/material';

import { getTvShowById } from '@/features/tv/service';
import { TvShowDetail } from '@/features/tv/types';
import useLoading from '@/hooks/useLoading';
import AppLoadingIndicator from '@/components/AppLoadingIndicator';
import BackButton from '@/components/BackButton';
import Banner from '@/components/Banner';
import GoToPageLink from '@/components/GoToPageLink';
import SectionTitle from '@/components/SectionTitle';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';

interface TvShowDetailPageProps {
  tvShow: TvShowDetail;
}

const TvShowDetailPage: NextPage<TvShowDetailPageProps> = ({ tvShow }) => {
  const isLoading = useLoading();

  const inSmallScreen = useIsSmallScreen();

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
            <Container
              sx={{
                display: 'flex',
                gap: 6,
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
              }}
            >
              {inSmallScreen ? null : (
                <Box sx={{ position: 'relative' }}>
                  <Image
                    src={tvShow.poster_path}
                    alt={tvShow.name}
                    height={450}
                    width={300}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </Box>
              )}
              <Stack gap={2} alignItems='flex-start'>
                <GoToPageLink href={tvShow.homepage} />
                <SectionTitle as='h2'>{tvShow.name}</SectionTitle>
                <Typography color='orange' fontWeight={600}>
                  IMDB: {tvShow.vote_average}
                </Typography>
                {inSmallScreen && (
                  <Box sx={{ position: 'relative' }}>
                    <Image
                      src={tvShow.poster_path}
                      alt={tvShow.name}
                      height={225}
                      width={150}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </Box>
                )}
                <Typography maxWidth={{ xs: '100%', md: '80%' }}>{tvShow.overview}</Typography>
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
