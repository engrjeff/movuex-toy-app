import AppLoadingIndicator from '@/components/AppLoadingIndicator';
import AppPagination from '@/components/AppPagination';
import SearchMovieResultCard from '@/features/movies/SearchMovieResultCard';
import { searchMovies } from '@/features/movies/service';
import { Movie } from '@/features/movies/types';
import useLoading from '@/hooks/useLoading';
import { PaginatedResult } from '@/lib/api';
import { Container, Stack, Typography } from '@mui/material';
import { GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

interface SearchPageProps extends PaginatedResult<Movie> {
  keyword: string;
}

const SearchPage: NextPage<SearchPageProps> = (props) => {
  const { results, total_pages, page, keyword } = props;

  const isLoading = useLoading();

  return (
    <>
      <Head>
        <title>Movuex</title>
      </Head>
      {isLoading ? (
        <AppLoadingIndicator />
      ) : (
        <Container>
          {results.length === 0 ? (
            <Typography component='h2' variant='h4' mt={6}>
              No results found
            </Typography>
          ) : (
            <Stack py={6}>
              <Stack flexDirection='row' justifyContent='space-between' mb={4}>
                <Typography component='h2' variant='h4'>
                  Results for &ldquo;{keyword}&rdquo;
                </Typography>
                {total_pages > 1 && (
                  <AppPagination
                    count={total_pages}
                    currentPage={page}
                    rootPath={`/search?keyword=${keyword}`}
                  />
                )}
              </Stack>

              <Stack gap={4}>
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <SearchMovieResultCard movie={movie} />
                  </Link>
                ))}
              </Stack>
            </Stack>
          )}
        </Container>
      )}
    </>
  );
};

interface SearchQueryParams extends ParsedUrlQuery {
  keyword: string;
  page: string;
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
  const { keyword, page } = context.query as SearchQueryParams;

  const results = await searchMovies(page, keyword);

  return {
    props: {
      ...results,
      keyword,
    },
  };
};

export default SearchPage;
