import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { ParsedUrlQuery } from 'querystring';

import { Box, Button, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getMovieById } from '@/features/movies/service';
import { MovieDetail } from '@/features/movies/types';
import AppLink from '@/components/AppLink';
import useLoading from '@/hooks/useLoading';
import AppLoadingIndicator from '@/components/AppLoadingIndicator';

interface MovieDetailPageProps {
  movie: MovieDetail;
}

const MovieDetailPage: NextPage<MovieDetailPageProps> = ({ movie }) => {
  const isLoading = useLoading();

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      {isLoading ? (
        <AppLoadingIndicator />
      ) : (
        <>
          <Button
            variant='text'
            startIcon={<ArrowBackIcon />}
            LinkComponent={AppLink}
            href='/movies'
            sx={{ mt: 6 }}
          >
            Back
          </Button>
          <Box py={6} display='flex' gap={6}>
            <Box sx={{ position: 'relative' }}>
              <Image
                src={movie.poster_path}
                alt={movie.title}
                height={330}
                width={220}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </Box>
            <Stack gap={2} alignItems='flex-start'>
              <Button
                LinkComponent='a'
                href={movie.homepage}
                target='_blank'
                referrerPolicy='no-referrer'
                endIcon={<OpenInNewIcon />}
              >
                Go to Page
              </Button>
              <Typography component='h2' variant='h3'>
                {movie.title}
              </Typography>
              <Typography color='orange' fontWeight={600}>
                IMDB: {movie.vote_average}
              </Typography>
              <Typography>{movie.overview}</Typography>
              <Typography>
                <Typography component='span' fontWeight='bold'>
                  Released Date:{' '}
                </Typography>
                {movie.release_date}
              </Typography>
              <Typography>
                <Typography component='span' fontWeight='bold'>
                  Duration:{' '}
                </Typography>
                {movie.runtime} minutes
              </Typography>
              <Typography>
                <Typography component='span' fontWeight='bold'>
                  Genre:{' '}
                </Typography>
                {movie.genres.map((g) => g.name).join(', ')}
              </Typography>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};

interface GetParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<MovieDetailPageProps> = async (context) => {
  const { id } = context.params as GetParams;

  const movie = await getMovieById(id);

  if (!movie)
    return {
      notFound: true,
    };

  return {
    props: {
      movie,
    },
  };
};

export default MovieDetailPage;
