import { Typography, Box, Select, MenuItem } from "@mui/material";
import React from "react";

const SortByDropDown = ({ sortBy, setSortBy, handleSortBy }) => {
  const options = [
    { label: "Release Date", value: "releaseDate" },
    { label: "View Count", value: "viewCount" },
  ];

  return (
    <Box>
      {/* <label> */}
      <Typography padding="1rem" variant="h7">
        Sort By:
      </Typography>
      <Select
        labelId="sortByDropDown"
        id="sort-By-Drop-Down"
        value={sortBy}
        defaultValue={"releaseDate"}
        label="Sort By:"
        onChange={(e) => {
          handleSortBy(e);
        }}
      >
        {options.map((option, index) => {
          return (
            <MenuItem value={option.value} key={index}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      {/* {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))} */}

      {/* </label> */}
    </Box>
  );
};

export default SortByDropDown;
