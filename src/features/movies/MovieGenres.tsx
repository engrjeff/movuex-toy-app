import { useRouter } from "next/router";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import type { Genre } from "./types";

function MovieGenres({ genres }: { genres: Genre[] }) {
  const router = useRouter();

  const genresQuery = (router.query.genres as string) || "";
  return (
    <List
      sx={{
        px: 2,
        border: "1px solid",
        borderColor: (theme) => theme.palette.divider,
        borderRadius: (theme) => theme.shape.borderRadius,
        alignSelf: "flex-start",
      }}
      aria-labelledby='movies-genres-filter'
      subheader={
        <ListSubheader component='div' id='movies-genres-filter'>
          Genres
        </ListSubheader>
      }
    >
      {genres.map((genre) => (
        <ListItem key={genre.id} disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            sx={{
              borderRadius: 100,
              bgcolor:
                genresQuery === genre.id.toString() ? "primary.main" : "",
            }}
            onClick={() => {
              router.push({
                pathname: "/movies",
                query: {
                  ...router.query,
                  genres: genre.id,
                },
              });
            }}
          >
            <ListItemText
              primary={genre.name}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default MovieGenres;
