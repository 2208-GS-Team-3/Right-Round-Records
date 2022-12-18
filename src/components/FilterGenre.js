import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setFilteredRecords, setGenreFilter } from "../store/recordsSlice";
import { useDispatch } from "react-redux";

const FilterGenre = () => {
  const genres = useSelector((state) => state.genres.genres);
  const genreFilter = useSelector((state) => state.records.genreFilter);
  const records = useSelector((state) => state.records.records);
  const dispatch = useDispatch();

  const handleGenreFilter = (event) => {
    dispatch(setGenreFilter(event.target.value));
    dispatch(setFilteredRecords(records));
  };

  const genreArray = ["all"];
  genres.map((genre) => genreArray.push(genre.name));

  return (
    <>
      <FormControl style={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Filter by Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="genrefilter"
          value={genreFilter}
          onChange={handleGenreFilter}
        >
          {genreArray.map((genre) => (
            <MenuItem value={genre} key={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default FilterGenre;
