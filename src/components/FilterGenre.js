import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FilterGenre = () => {
  const genres = useSelector((state) => state.genres.genres);
  const [genreFilter, setGenreFilter] = useState("all");

  // let recordsToDisplay = records.filter(function (record) {
  //   if (genreFilter !== "all") {
  //     //   console.log(record.genre);
  //     //   return record.genres.includes(genreFilter);
  //   } else {
  //     return records;
  //   }
  // });
  //   console.log(recordsToDisplay);

  const changeGenre = (e) => {
    e.preventDefault();
    setGenreFilter(e.target.value);
  };

  return (
    <>
      <FormControl style={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Filter by Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genreFilter}
          label="genrefilter"
          onChange={changeGenre}
        >
          {genres.map((genre) => (
            <MenuItem value={genre} key={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default FilterGenre;
