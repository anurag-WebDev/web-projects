import React from "react";
import { Box, styled, ToggleButton } from "@mui/material";

const GenerateChip = ({
  chip,
  handleChipFilters,
  genreFilterList,
  ageFilterList,
}) => {
  const FilterButton = styled(ToggleButton)({
    textTransform: "capitalize",
    color: "black",
    fontsize: "1.5rem",
    background: "lightgray",
    // border: "none",
    height: "2rem",
    borderRadius: "16px",
    boxShadow: "none",
    fontWeight: "400",
    "&.Mui-selected:hover": {
      backgroundColor: "purple",
      color: "white",
      borderRadius: "16px",
    },
    "&.Mui-selected": {
      backgroundColor: "black",
      color: "white",
      borderRadius: "16px",
    },
    "&:hover": {
      backgroundColor: "blue",
      color: "white",
      borderRadius: "16px",
    },
  });

  if (Object.keys(chip).includes("genre")) {
    return (
      <Box paddingRight="0.5rem">
        {" "}
        <FilterButton
          selected={genreFilterList.includes(chip.genre) ? true : false}
          // sx={{ borderRadius: "5rem" }}
          variant="contained"
          name="genre"
          value={chip.genre}
          onClick={(e) => {
            handleChipFilters(e);
          }}
        >
          {chip.genre}
        </FilterButton>
      </Box>
    );
  } else {
    return (
      <Box paddingRight="0.5rem">
        {" "}
        <FilterButton
          selected={ageFilterList.includes(chip.age) ? true : false}
          sx={{ borderRadius: "5rem" }}
          variant="contained"
          name="age"
          value={chip.age}
          onClick={(e) => {
            handleChipFilters(e);
          }}
        >
          {chip.age}
        </FilterButton>
      </Box>
    );
  }
  // console.log(Object.keys(chip).includes("genre"));
};

export default GenerateChip;
