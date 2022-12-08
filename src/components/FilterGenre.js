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
          <select key={"selector"} onChange={changeFilterValue} defaultValue={"all"}>
            <option key={"all"} value="all">All Genres</option>
            {genres.map((genre) => (
              <option value={genre.name} key={`${genre?.name}`}>
                {genre?.name}
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
