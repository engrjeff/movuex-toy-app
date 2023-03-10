import { type GetServerSideProps } from "next";
import type { ReactElement } from "react";
import Head from "next/head";
import type { NextPageWithLayout } from "../_app";

import { Box, Container, Stack } from "@mui/material";

import { Genre, GetMoviesUrlQuery, Movie } from "@/features/movies/types";
import { getMovieGenres, getMovies } from "@/features/movies/service";

import { Country, getCountries, PaginatedResult } from "@/lib/api";
import AppPagination from "@/components/AppPagination";
import SectionTitle from "@/components/SectionTitle";
import MoviesGrid from "@/features/movies/MoviesGrid";
import MovieGenres from "@/features/movies/MovieGenres";
import MoviesFilter from "@/features/movies/MoviesFilter";
import MoviesSort from "@/features/movies/MoviesSort";

interface MoviesPageProps {
  moviesData: PaginatedResult<Movie>;
  genres: Genre[];
  countries: Country[];
  query: GetMoviesUrlQuery;
}

const MoviesPage: NextPageWithLayout<MoviesPageProps> = (props) => {
  const { moviesData } = props;
  const { results: movies, total_pages, page } = moviesData;

  return (
    <>
      <Head>
        <title>Movuex | Movies</title>
      </Head>
      <Box flex={1}>
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
  const { genres, query, countries } = page.props;

  const selectedGenre = genres.find((g) => g.id.toString() === query.genres);

  return (
    <Container>
      <Box py={4}>
        <Stack
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <SectionTitle as='h2'>
            {selectedGenre ? selectedGenre.name + " Movies" : "Movies"}
          </SectionTitle>
          <Box display='flex' gap={2}>
            <MoviesSort />
            <MoviesFilter genres={genres} countries={countries} />
          </Box>
        </Stack>
        <Box display='flex' gap={4}>
          <MovieGenres genres={genres} />
          {page}
        </Box>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<MoviesPageProps> = async (
  context
) => {
  const moviesData = await getMovies(context.query as GetMoviesUrlQuery);
  const movieGenres = await getMovieGenres();
  const countries = await getCountries();

  return {
    props: {
      moviesData,
      genres: movieGenres,
      countries,
      query: context.query,
    },
  };
};

export default MoviesPage;
