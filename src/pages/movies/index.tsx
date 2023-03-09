import { type NextPage, type GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { Box, Container, Stack } from '@mui/material';

import { Movie } from '@/features/movies/types';
import { getMovies } from '@/features/movies/service';
import MovieCard from '@/features/movies/MovieCard';

import { PaginatedResult } from '@/lib/api';
import AppPagination from '@/components/AppPagination';
import useLoading from '@/hooks/useLoading';
import AppLoadingIndicator from '@/components/AppLoadingIndicator';
import SectionTitle from '@/components/SectionTitle';

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
          <Stack
            display='flex'
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
            mb={3}
          >
            <SectionTitle as='h2'>Movies - Now Playing</SectionTitle>
            <AppPagination count={total_pages} currentPage={page} rootPath='movies' />
          </Stack>
          <Box
            display='grid'
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(5, 1fr)',
            }}
            gap={{ xs: 2, sm: 3 }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
          <Box display='flex' justifyContent='flex-end' my={3}>
            <AppPagination count={total_pages} currentPage={page} rootPath='movies' />
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
