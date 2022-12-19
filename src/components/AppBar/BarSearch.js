import { Autocomplete, Container, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BarSearch = () => {
  const records = useSelector((state) => state.records.records);
  const navigate = useNavigate();

  const handleSearchRecord = (event) => {
    navigate(
      `/records/${
        event.target.innerHTML?.split(".")[0] ||
        event.target.innerText?.split(".")[0] ||
        event.target.value?.split(".")[0]
      }`
    );
  };

  return (
    <Container>
      <Autocomplete
        sx={{ width: "20vw"}}
        freeSolo
        id="record-search"
        disableClearable
        onChange={handleSearchRecord}
        options={records.map((option) => {
            return `${option.id}. ${option.albumName}`;
        })}
        renderInput={(params) => (
            <TextField
            variant="outlined"
            sx={{color: "white"}}
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Container>
  );
};

export default BarSearch;
