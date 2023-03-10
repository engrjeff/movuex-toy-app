import { type NextPage, type GetServerSideProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

import { Box, Container, Stack } from "@mui/material";

import { TvShow } from "@/features/tv/types";
import { getTvShows } from "@/features/tv/service";
import TvShowCard from "@/features/tv/TvShowCard";

import { PaginatedResult } from "@/lib/api";
import AppPagination from "@/components/AppPagination";
import SectionTitle from "@/components/SectionTitle";

type TvShowsPageProps = PaginatedResult<TvShow>;

const TvShowsPage: NextPage<TvShowsPageProps> = (props) => {
  const { results: shows, total_pages, page } = props;

  return (
    <Container>
      <Head>
        <title>Movuex | TV Shows</title>
      </Head>

      <Box py={4}>
        <Stack
          display='flex'
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent='space-between'
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <SectionTitle as='h2'>Popular TV Shows</SectionTitle>
        </Stack>
        <Box
          display='grid'
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={{ xs: 2, sm: 3 }}
        >
          {shows.map((show) => (
            <TvShowCard key={show.id} tvShow={show} />
          ))}
        </Box>
        <Box display='flex' justifyContent='flex-end' my={3}>
          <AppPagination
            count={total_pages}
            currentPage={page}
            rootPath='tv-shows'
          />
        </Box>
      </Box>
    </Container>
  );
};

interface GetUrlQuery extends ParsedUrlQuery {
  page?: string;
}

export const getServerSideProps: GetServerSideProps<TvShowsPageProps> = async (
  context
) => {
  const { page } = context.query as GetUrlQuery;

  const data = await getTvShows(page);
  return {
    props: data,
  };
};

export default TvShowsPage;
