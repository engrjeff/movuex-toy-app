import { MovieCast } from "./types";

import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

interface MovieCastCardProps {
  cast: MovieCast;
}

function MovieCastCard({ cast }: MovieCastCardProps) {
  return (
    <Card sx={{ minWidth: 150, flex: 1 }} variant='outlined'>
      <Image
        src={cast.profile_path}
        alt={cast.name}
        width={150}
        height={200}
        style={{ width: "100%", objectFit: "cover", height: "auto" }}
      />
      <CardContent>
        <Typography gutterBottom variant='h6' fontSize={14} component='div'>
          {cast.name}
        </Typography>
        <Typography fontSize={12} color='text.secondary'>
          As {cast.character}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCastCard;
