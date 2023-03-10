import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { ParsedUrlQuery } from "querystring";

import { Box, Container, Stack, Typography } from "@mui/material";

import { getMovieById } from "@/features/movies/service";
import { MovieDetail } from "@/features/movies/types";
import Banner from "@/components/Banner";
import BackButton from "@/components/BackButton";
import MovieCastCard from "@/features/movies/MovieCastCard";
import MovieKeywords from "@/features/movies/MovieKeywords";
import YouTube from "@/components/Youtube";
import SectionTitle from "@/components/SectionTitle";
import GoToPageLink from "@/components/GoToPageLink";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";

interface MovieDetailPageProps {
  movie: MovieDetail;
}

const MovieDetailPage: NextPage<MovieDetailPageProps> = ({ movie }) => {
  const inSmallScreen = useIsSmallScreen();

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>

      <>
        <Container>
          <BackButton backTo='/movies' />
        </Container>
        <Banner imagePath={movie.backdrop_path}>
          <Container
            sx={{
              display: "flex",
              gap: 6,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            {inSmallScreen ? null : (
              <Box sx={{ position: "relative" }}>
                <Image
                  src={movie.poster_path}
                  alt={movie.title}
                  height={450}
                  width={300}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}
            <Stack gap={2} alignItems='flex-start'>
              <GoToPageLink href={movie.homepage} />
              <SectionTitle as='h2'>
                {movie.title} ({movie.release_date.split("-")[0]})
              </SectionTitle>
              <Typography color='orange' fontWeight={600}>
                IMDB: {movie.vote_average}
              </Typography>
              {inSmallScreen && (
                <Box sx={{ position: "relative" }}>
                  <Image
                    src={movie.poster_path}
                    alt={movie.title}
                    height={225}
                    width={150}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </Box>
              )}
              <Typography maxWidth={{ xs: "100%", md: "80%" }}>
                {movie.overview}
              </Typography>
              <Typography>
                <Typography component='span' fontWeight='bold'>
                  Released Date:{" "}
                </Typography>
                {movie.release_date}
              </Typography>
              <Typography>
                <Typography component='span' fontWeight='bold'>
                  Duration:{" "}
                </Typography>
                {movie.runtime} minutes
              </Typography>
              <Typography>
                <Typography component='span' fontWeight='bold'>
                  Genre:{" "}
                </Typography>
                {movie.genres.map((g) => g.name).join(", ")}
              </Typography>
            </Stack>
          </Container>
        </Banner>
        <Container>
          <Stack
            display={movie.keywords.keywords.length > 0 ? "flex" : "none"}
            component='section'
            py={4}
            gap={3}
          >
            <SectionTitle as='h2'>Keywords</SectionTitle>
            <MovieKeywords keywords={movie.keywords.keywords} />
          </Stack>
          <Stack
            gap={3}
            display={movie.videos.results[0] ? "flex" : "none"}
            component='section'
            py={4}
          >
            <SectionTitle as='h2'>Trailer</SectionTitle>
            <YouTube id={movie.videos.results[0].key} />
          </Stack>
          <Stack gap={3} component='section' py={4}>
            <SectionTitle as='h2'>Cast</SectionTitle>
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
              {movie.credits.cast.map((c) => (
                <MovieCastCard key={c.id} cast={c} />
              ))}
            </Box>
          </Stack>
        </Container>
      </>
    </>
  );
};

interface GetParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  MovieDetailPageProps
> = async (context) => {
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
