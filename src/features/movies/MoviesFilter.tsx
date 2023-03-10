import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Badge from "@mui/material/Badge";

import CloseIcon from "@mui/icons-material/Close";
import FilterIcon from "@mui/icons-material/FilterList";

import ChipInput from "@/components/ChipInput";

import { Genre } from "./types";
import { Country } from "@/lib/api";

interface MoviesFilterProps {
  genres: Genre[];
  countries: Country[];
}

function MoviesFilter({ genres, countries }: MoviesFilterProps) {
  const router = useRouter();
  const [filterDrawerShown, setFilterDrawerShown] = useState(false);

  const openDrawer = () => setFilterDrawerShown(true);
  const closeDrawer = () => setFilterDrawerShown(false);

  const handleApplyFilter: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const filterData = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };

    const country = formData.get("country");

    const countryFilter = countries.find(
      (c) => c.english_name === country
    )?.iso_3166_1;

    router.push({
      pathname: "/movies",
      query: {
        ...router.query,
        ...filterData,
        country: countryFilter,
      },
    });

    closeDrawer();
  };

  const handleReset = () => {
    router.push({
      pathname: "/movies",
      query: {
        page: router.query.page,
      },
    });

    closeDrawer();
  };

  const countryDefaultValue = countries.find(
    (c) => c.iso_3166_1 === router.query.country
  );

  const truthyFilters = Object.entries(router.query).filter(
    ([k, v]) => Boolean(v) && !["page", "sortBy"].includes(k)
  );

  return (
    <>
      <Stack flexDirection='row' gap={3}>
        <Badge
          badgeContent={truthyFilters.length}
          color='primary'
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Button
            onClick={openDrawer}
            sx={{
              color: "white",
              borderColor: (theme) => theme.palette.divider,
            }}
            variant='outlined'
            startIcon={<FilterIcon />}
          >
            Filter
          </Button>
        </Badge>
      </Stack>
      <Drawer
        anchor='right'
        open={filterDrawerShown}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            backgroundImage: "unset",
            width: {
              xs: 300,
              sm: 400,
            },
          },
        }}
      >
        <Stack
          height='100%'
          bgcolor='background.paper'
          borderLeft={1}
          borderColor='divider'
        >
          <Stack
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            px={3}
            py={2.4}
          >
            <Typography component='h3' variant='h6'>
              Filter Movies
            </Typography>
            <IconButton
              size='small'
              edge='end'
              onClick={closeDrawer}
              aria-label='close filter drawer'
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack component='form' p={3} onSubmit={handleApplyFilter} gap={2}>
            <FormControl>
              <label id='year-filter'>Year</label>
              <RadioGroup
                sx={{ mt: 1 }}
                row
                aria-labelledby='year-filter'
                name='year'
                defaultValue={router.query.year}
              >
                {[2023, 2022, 2021, 2020, 2019].map((year) => (
                  <FormControlLabel
                    key={year}
                    value={year}
                    control={<Radio size='small' />}
                    label={year}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Divider />
            <FormControl>
              <label id='genres-filter'>Genres</label>
              <RadioGroup
                sx={{ mt: 1 }}
                row
                aria-labelledby='genres-filter'
                name='genres'
                defaultValue={router.query.genres}
              >
                <Stack flexDirection='row' gap={1} flexWrap='wrap'>
                  {genres.map((genre) => (
                    <ChipInput
                      key={genre.id}
                      label={genre.name}
                      value={genre.id.toString()}
                    />
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
            <Divider />
            <FormControl>
              <label id='country-filter'>Region</label>
              <Autocomplete
                disablePortal
                id='country-filter'
                options={countries}
                defaultValue={countryDefaultValue}
                sx={{ mt: 1 }}
                getOptionLabel={(country) => country.english_name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    defaultValue={countryDefaultValue?.english_name}
                    fullWidth
                    name='country'
                    size='small'
                    placeholder='Select a country'
                  />
                )}
              />
            </FormControl>
            <Stack gap={2} py={2}>
              <Button type='submit'>Apply Filters</Button>
              <Button variant='outlined' onClick={handleReset}>
                Clear Filters
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}

export default MoviesFilter;
