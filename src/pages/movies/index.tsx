import { type GetServerSideProps } from "next";
import type { ReactElement } from "react";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import type { NextPageWithLayout } from "../_app";

import { Box, Container, Stack, Typography } from "@mui/material";

import { Genre, Movie } from "@/features/movies/types";
import { getMovieGenres, getMovies } from "@/features/movies/service";

import { PaginatedResult } from "@/lib/api";
import AppPagination from "@/components/AppPagination";
import useLoading from "@/hooks/useLoading";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";
import SectionTitle from "@/components/SectionTitle";
import MoviesGrid from "@/features/movies/MoviesGrid";
import MovieGenres from "@/features/movies/MovieGenres";

interface MoviesPageProps {
  moviesData: PaginatedResult<Movie>;
  genres: Genre[];
}

const MoviesPage: NextPageWithLayout<MoviesPageProps> = (props) => {
  const isLoading = useLoading();

  const { moviesData, genres } = props;
  const { results: movies, total_pages, page } = moviesData;

  return (
    <>
      <Head>
        <title>Movuex | Movies</title>
      </Head>
      <Box>
        <MoviesGrid movies={movies} />
        <Box display='flex' justifyContent='flex-end' my={3}>
          <AppPagination
            count={total_pages}
            currentPage={page}
            rootPath='movies'
          />
        </Box>
      </Box>
    </>
  );
};

MoviesPage.getLayout = function getLayout(page: ReactElement<MoviesPageProps>) {
  const { genres } = page.props;
  return (
    <Container>
      <Box py={4}>
        <Stack
          display='flex'
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent='space-between'
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <SectionTitle as='h2'>Movies - Now Playing</SectionTitle>
        </Stack>
        <Box display='flex' gap={4}>
          <MovieGenres genres={genres} />
          {page}
        </Box>
      </Box>
    </Container>
  );
};

interface GetUrlQuery extends ParsedUrlQuery {
  page?: string;
  genres?: string;
}

export const getServerSideProps: GetServerSideProps<MoviesPageProps> = async (
  context
) => {
  const { page, genres } = context.query as GetUrlQuery;

  const moviesData = await getMovies(page, genres);
  const movieGenres = await getMovieGenres();

  return {
    props: {
      moviesData,
      genres: movieGenres,
    },
  };
};

export default MoviesPage;
