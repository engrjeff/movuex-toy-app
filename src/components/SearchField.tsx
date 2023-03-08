import { Box, InputAdornment, OutlinedInput, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function SearchField() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    router.push({
      pathname: '/search',
      query: {
        keyword,
      },
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <Box width={450} component='form' onSubmit={handleSubmit}>
      <OutlinedInput
        fullWidth
        placeholder='Search for movies'
        value={keyword}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position='end'>
            <Button LinkComponent={Link} href={`/search?keyword=${keyword}`}>
              Search
            </Button>
          </InputAdornment>
        }
      />
    </Box>
  );
}

export default SearchField;
