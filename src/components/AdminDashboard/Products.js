import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import EditProductForm from "./EditProductForm";
import {
  setRecordToEdit,
  setEditInProgress,
} from "../../store/editRecordSlice";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { setShowAddForm } from "../../store/recordsSlice";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export default function Products() {
  const records = useSelector((state) => state.records.records);
  const editInProgress = useSelector(
    (state) => state.recordToEdit.editInProgress
  );

  const [showProducts, setShowProducts] = useState(true);

  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };
  const dispatch = useDispatch();
  const params = useParams();
  const recordId = params.id;

  const handleSearch = (event) => {
    console.log("not searching yet...");
  };

  const displayEdit = (event) => {
    dispatch(setEditInProgress(true));
    const filteredRecord = records.filter(
      (record) => record.id === Number(event.target.value)
    );
    dispatch(setRecordToEdit(filteredRecord));
  };

  const showForm = () => {
    dispatch(setShowAddForm(true));
  };

  return (
    <React.Fragment>
      {!editInProgress && (
        <>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "30px",
            }}
          >
            <Title>Products</Title>
            {!showProducts ? (
              <Button
                variant="contained"
                size="small"
                style={{ width: "30px" }}
                onClick={toggleProducts}
              >
                <ArrowLeftIcon />
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                style={{ width: "30px" }}
                onClick={toggleProducts}
              >
                <ArrowDropDownIcon />
              </Button>
            )}
            <Container>
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
                variant="contained"
                style={{ width: "400px" }}
                onClick={showForm}
              >
                Add product
              </Button>
            </Container>
          </Container>

          <div style={{ overflowX: "auto", height: "400px" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "center" }}>
                    Product #
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Album Name
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>Artist</TableCell>
                  <TableCell style={{ textAlign: "center" }}>Price</TableCell>
                  <TableCell style={{ textAlign: "center" }}>Year</TableCell>
                  <TableCell style={{ textAlign: "center" }}>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell style={{ textAlign: "center" }}>
                      {record.id}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {record.albumName}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {record.artist}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {record.price}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {record.year}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        size="small"
                        value={record.id}
                        onClick={displayEdit}
                        style={{ margin: "0px auto", padding: "0px" }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {editInProgress && <EditProductForm />}
    </React.Fragment>
  );
}
