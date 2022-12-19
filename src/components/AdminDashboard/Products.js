import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { setRecordToEdit } from "../../store/editRecordSlice";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export default function Products() {
  const records = useSelector((state) => state.records.records);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navRecordEdit = (recordId) => navigate(`${recordId}`);
  const navRecordAdd = () => navigate(`add`);

  const handleSearch = (event) => {
    console.log("not searching yet...");
  };

  const displayEdit = (event) => {
    const filteredRecord = records.filter(
      (record) => record.id === Number(event.target.value)
    );
    dispatch(setRecordToEdit(filteredRecord));
    navRecordEdit(Number(event.target.value));
  };

  return (
    <Container
      style={{
        padding: "20px",
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
          margin: "10px",
        }}
      >
        <TextField
          id="search-bar"
          className="text"
          onChange={handleSearch}
          label="Search by artist or album name"
          variant="outlined"
          placeholder="Search..."
          size="small"
          style={{ width: "400px" }}
        />
        <Button
          style={{ width: "400px", backgroundColor: "black", color: "white" }}
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
          {records.map((record) => (
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
