import React from "react";
import { Stack, Box, Grid } from "@mui/material";

import GenerateChip from "./GenerateChip";
import SortByDropDown from "./SortByDropDown";

const FiltersContainer = ({
  handleChipFilters,
  sortBy,
  setSortBy,
  handleSortBy,
  genreFilterList,
  ageFilterList,
}) => {
  const genreFilters = [
    { genre: "All" },
    { genre: "Education" },
    { genre: "Sports" },
    { genre: "Comedy" },
    { genre: "Lifestyle" },
  ];

  const ageFilters = [
    { age: "All" },
    { age: "7+" },
    { age: "12+" },
    { age: "16+" },
    { age: "18+" },
  ];

  const genreChips = (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
            <Stack
              direction="column"
              spacing={1}
              paddingTop="1rem"
              sx={{ display: "flex" }}
            >
              <Box display="flex" justifyContent="center" padding="0.5rem">
                {genreFilters.map((chip, index) => (
                  <GenerateChip
                    chip={chip}
                    handleChipFilters={handleChipFilters}
                    key={index}
                    genreFilterList={genreFilterList}
                  />
                ))}
              </Box>
              <Box display="flex" justifyContent="center">
                {ageFilters.map((chip, index) => (
                  <GenerateChip
                    chip={chip}
                    key={index}
                    ageFilterList={ageFilterList}
                    handleChipFilters={handleChipFilters}
                  />
                ))}
              </Box>
            </Stack>

            <Box padding="0.8rem">
              <SortByDropDown
                sortBy={sortBy}
                setSortBy={setSortBy}
                handleSortBy={handleSortBy}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );

  return <>{genreChips}</>;
};

export default FiltersContainer;
