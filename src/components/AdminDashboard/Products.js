import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import TextField from "@mui/material/TextField";
import EditProductForm from './EditProductForm';
import {setRecordToEdit, setEditInProgress} from '../../store/editRecordSlice'
import { useParams, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import { setShowAddForm } from '../../store/recordsSlice';


export default function Products() {
const records = useSelector((state) => state.records.records);
const editInProgress = useSelector((state) => state.recordToEdit.editInProgress);

const dispatch = useDispatch()
  const params = useParams();
  const recordId = params.id;


const handleSearch = (event) => {
    console.log('not searching yet...')
}

const displayEdit = (event) => {
    dispatch(setEditInProgress(true))
    const filteredRecord = records.filter((record) => record.id === Number(event.target.value))
    dispatch(setRecordToEdit(filteredRecord))
}

const showForm = () => {
dispatch(setShowAddForm(true))
}


  return (
    <React.Fragment>
      {!editInProgress && ( <><Title>Products</Title>
      <Container style={{display: 'flex', justifyContent: "space-evenly", margin: '30px'}}>
      <TextField
      id="search-bar"
      className="text"
      onChange={handleSearch}
      label="Search by artist or album name"
      variant="outlined"
      placeholder="Search..."
      size="small"
      style={{width: '400px'}}
    />
<Button variant="contained" style={{width: '400px'}} onClick={showForm}>Add product</Button>
</Container>

      <div style={{overflowX: 'auto', height: '550px'}}>
       <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product #</TableCell>
            <TableCell>Album Name</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Year</TableCell>
            <TableCell ></TableCell>
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
              <TableCell><Button size="small" value={record.id} onClick={displayEdit}>Edit</Button>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div></>)}

      {editInProgress && <EditProductForm/>}
    </React.Fragment>
  );
}