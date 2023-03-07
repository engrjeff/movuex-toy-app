import { type NextPage, type GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { Box, Typography } from '@mui/material';

import { TvShow } from '@/features/tv/types';
import { getTvShows } from '@/features/tv/service';
import TvShowCard from '@/features/tv/TvShowCard';

import { PaginatedResult } from '@/lib/api';
import AppPagination from '@/components/AppPagination';
import useLoading from '@/hooks/useLoading';
import AppLoadingIndicator from '@/components/AppLoadingIndicator';

type TvShowsPageProps = PaginatedResult<TvShow>;

const TvShowsPage: NextPage<TvShowsPageProps> = (props) => {
  const isLoading = useLoading();

  const { results: shows, total_pages, page } = props;

  return (
    <>
      <Head>
        <title>Movuex | TV Shows</title>
      </Head>

      {isLoading ? (
        <AppLoadingIndicator />
      ) : (
        <Box py={4}>
          <Box display='flex' justifyContent='space-between'>
            <Typography component='h2' variant='h4' mb={3}>
              Popular TV Shows
            </Typography>
            <AppPagination count={total_pages} currentPage={page} rootPath='tv-shows' />
          </Box>
          <Box display='grid' gridTemplateColumns='repeat(5, 1fr)' gap={2}>
            {shows.map((show) => (
              <TvShowCard key={show.id} tvShow={show} />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

interface GetUrlQuery extends ParsedUrlQuery {
  page?: string;
}

export const getServerSideProps: GetServerSideProps<TvShowsPageProps> = async (context) => {
  const { page } = context.query as GetUrlQuery;

  const data = await getTvShows(page);
  return {
    props: data,
  };
};

export default TvShowsPage;
