import { type NextPage, type GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { Box, Typography, Container } from '@mui/material';

import { Movie } from '@/features/movies/types';
import { getMovies } from '@/features/movies/service';
import MovieCard from '@/features/movies/MovieCard';

import { PaginatedResult } from '@/lib/api';
import AppPagination from '@/components/AppPagination';
import useLoading from '@/hooks/useLoading';
import AppLoadingIndicator from '@/components/AppLoadingIndicator';

type MoviesPageProps = PaginatedResult<Movie>;

const MoviesPage: NextPage<MoviesPageProps> = (props) => {
  const isLoading = useLoading();

  const { results: movies, total_pages, page } = props;

  return (
    <Container>
      <Head>
        <title>Movuex | Movies</title>
      </Head>
      {isLoading ? (
        <AppLoadingIndicator />
      ) : (
        <Box py={4}>
          <Box display='flex' justifyContent='space-between'>
            <Typography component='h2' variant='h4' mb={3}>
              Now Playing
            </Typography>
            <AppPagination count={total_pages} currentPage={page} rootPath='movies' />
          </Box>
          <Box display='grid' gridTemplateColumns='repeat(5, 1fr)' gap={2}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

interface GetUrlQuery extends ParsedUrlQuery {
  page?: string;
}

export const getServerSideProps: GetServerSideProps<MoviesPageProps> = async (context) => {
  const { page } = context.query as GetUrlQuery;

  const data = await getMovies(page);
  return {
    props: data,
  };
};

export default MoviesPage;
