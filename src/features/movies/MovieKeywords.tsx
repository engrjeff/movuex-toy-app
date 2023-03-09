import { Chip, Stack } from '@mui/material';
import { Keyword } from './types';

interface MovieKeywordsProps {
  keywords: Keyword[];
}

function MovieKeywords({ keywords }: MovieKeywordsProps) {
  return (
    <Stack flexDirection='row' gap={1} flexWrap='wrap'>
      {keywords.map((item) => (
        <Chip key={item.id} label={item.name} variant='outlined' />
      ))}
    </Stack>
  );
}

export default MovieKeywords;
