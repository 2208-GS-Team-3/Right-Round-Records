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
import { useState } from "react";
import TextField from "@mui/material/TextField";
import EditProductForm from './EditProductForm';
import {setRecordToEdit} from '../../store/editRecordSlice'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';

export default function Products() {
const records = useSelector((state) => state.records.records);
const [editInfo, setEditInfo] = useState(false)
const dispatch = useDispatch()
const navigate = useNavigate();
  const params = useParams();
  const recordId = params.id;


const handleSearch = (event) => {
    console.log('not searching...')
}


const displayInput = (event) => {
    setEditInfo((val) => !val)
    const filteredRecord = records.filter((record) => record.id === Number(event.target.value))
    dispatch(setRecordToEdit(filteredRecord))
}

  return (
    <React.Fragment>
      <Title>Products</Title>
      <TextField
      id="search-bar"
      className="text"
      onChange={handleSearch}
      label="Search by artist or album name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
      <div style={{overflowX: 'auto', height: '550px'}}>
      {!editInfo && (<Table size="small">
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
              <TableCell><Button size="small" value={record.id} onClick={displayInput}>Edit</Button>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>)}

      {editInfo && <EditProductForm/>}
      </div>
    </React.Fragment>
  );
}