import React, { useState } from "react";
import { useSelector } from "react-redux";

const FilterGenre = () => {
  const records = useSelector((state) => state.records.records);
  const genres = useSelector((state) => state.genres.genres);
  const [genreFilter, setGenreFilter] = useState("all");

  //cant quite test this out without the associations being made in the seed btw genres and records
  //genreFilter should determine genres displaying on UI
  let recordsToDisplay = records.filter(function (record) {
    if (genreFilter !== "all") {
      //   console.log(record.genre);
      //   return record.genres.includes(genreFilter);
    } else {
      return records;
    }
  });
  //   console.log(recordsToDisplay);

  const changeFilterValue = (e) => {
    e.preventDefault();
    setGenreFilter(e.target.value);
  };

  return (
    <>
      <form>
        <label>
          Filter Records by Genre:
          <select onChange={changeFilterValue} defaultValue={"all"}>
            <option value="all">All Genres</option>
            {genres.map((genre) => (
              <option value={genre.genreName} key={genre.id}>
                {genre.genreName}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default FilterGenre;
