import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
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
        sx={{ width: "20vw", borderColor: "white"}}
        freeSolo
        size="small"
        id="record-search"
        disableClearable
        onChange={handleSearchRecord}
        options={records.map((option) => {
            return `${option.id}. ${option.albumName}`;
        })}
        renderInput={(params) => (
            <TextField
            variant="filled"

            sx={{fill: "background", backgroundColor: "white", borderColor: "white", borderBlockColor: "white", color: "white"}}
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
