import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { setRecordToEdit } from "../../store/editRecordSlice";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

export default function Products() {
  const records = useSelector((state) => state.records.records);
  const [searchRecord, setSearchRecord] = useState();
  const [searchFilter, setSearchFilter] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navRecordEdit = (recordId) => navigate(`${recordId}`);
  const navRecordAdd = () => navigate(`add`);

  const displayEdit = (event) => {
    const filteredRecord = records.filter(
      (record) => record.id === Number(event.target.value)
    );
    dispatch(setRecordToEdit(filteredRecord));
    navRecordEdit(Number(event.target.value));
  };

  const handleSearchRecord = (event) => {
    setSearchRecord(
      event.target.innerHTML || event.target.innerText || event.target.value
    );
  };

  useEffect(() => {
    setSearchFilter(
      records.filter((record) => {
        return searchRecord
          ? record.id === Number(searchRecord?.split(".")[0]) ||
              record.albumName
                ?.toLowerCase()
                ?.includes(searchRecord?.toLowerCase()) ||
              record.albumName?.includes(
                searchRecord?.split(".")[1]?.toLowerCase()
              )
          : record.id !== Number(searchRecord?.split(".")[0]);
      })
    );
  }, [searchRecord, records]);

  return (
    <Container
      style={{
        padding: "3%",
        backgroundColor: "white",
        borderRadius: "5px",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" component="h5">
        Products
      </Typography>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "20vw",
          padding: '3%'
        }}
      >
        <Autocomplete
          fullWidth
          freeSolo
          id="product-search"
          disableClearable
          onChange={handleSearchRecord}
          options={records.map((option) => {
            return `${option.id}. ${option.albumName}`;
          })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              onChange={handleSearchRecord}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Button
          style={{ width: "400px", backgroundColor: "black", color: "white" }}
          fullWidth
          sx={{ width: "30vw"}}
          variant="contained"
          onClick={navRecordAdd}
        >
          Add product
        </Button>
      </Container>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product #</TableCell>
            <TableCell>Album Name</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Year</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchFilter.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.albumName}</TableCell>
              <TableCell>{record.artist}</TableCell>
              <TableCell>{record.price}</TableCell>
              <TableCell>{record.year}</TableCell>
              <TableCell>
                <Button size="small" value={record.id} onClick={displayEdit}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
