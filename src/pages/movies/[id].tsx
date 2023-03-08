import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { ParsedUrlQuery } from 'querystring';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { getMovieById } from '@/features/movies/service';
import { MovieDetail } from '@/features/movies/types';
import useLoading from '@/hooks/useLoading';
import AppLoadingIndicator from '@/components/AppLoadingIndicator';
import Banner from '@/components/Banner';
import BackButton from '@/components/BackButton';
import MovieCastCard from '@/features/movies/MovieCastCard';
import MovieKeywords from '@/features/movies/MovieKeywords';

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
          <Container>
            <BackButton backTo='/movies' />
          </Container>
          <Banner imagePath={movie.backdrop_path}>
            <Container sx={{ display: 'flex', gap: 6 }}>
              <Box sx={{ position: 'relative' }}>
                <Image
                  src={movie.poster_path}
                  alt={movie.title}
                  height={450}
                  width={300}
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
                <Typography component='h2' variant='h4'>
                  {movie.title} ({movie.release_date.split('-')[0]})
                </Typography>
                <Typography color='orange' fontWeight={600}>
                  IMDB: {movie.vote_average}
                </Typography>
                <Typography maxWidth='70%'>{movie.overview}</Typography>
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
            </Container>
          </Banner>
          <Container>
            <Stack component='section' py={4}>
              <Typography gutterBottom component='h3' variant='h3'>
                Keywords
              </Typography>
              <MovieKeywords keywords={movie.keywords.keywords} />
            </Stack>
            <Stack component='section' py={4}>
              <Typography gutterBottom component='h3' variant='h3'>
                Cast
              </Typography>
              <Box display='flex' gap={3} flexWrap='wrap'>
                {movie.credits.cast.map((c) => (
                  <MovieCastCard key={c.id} cast={c} />
                ))}
              </Box>
            </Stack>
          </Container>
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
