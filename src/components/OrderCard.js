import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { setRecord } from '../store/singleOrderSlice';
import { useDispatch } from "react-redux";


const OrderCard = ({ order }) => {

  const dateFormatted = order.datePlaced.slice(0, 10)

  //datePlaced,status,shippingAddress,trackingNumber,
  const [deletedOrder, setDeletedOrder] = useState({})
  const [deleteError, setDeleteError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOrderChange = async () => {
    try {
        // get token of logged in user
      const token = window.localStorage.getItem("token");
      // data to send to backend
      const tokenData = {
        headers: {
          authorization: token,
        },
      };

      const orderToDelete = await axios.get(`/api/orders/${order.id}`)
      setDeletedOrder(orderToDelete.data);
      const updatedStatus = 'cancelled'


      const updatedOrder = {
        
          status: updatedStatus,
          shippingAddress:order.shippingAddress,
          billingAddress:order.billingAddress,
          totalCost:order.totalCost,
          creditCardName:order.creditCardName,
          creditCardNum:order.creditCardNum,
          ccSecurity:order.ccSecurity,
          expiryDate:order.expiryDate,
      }

      //update status for the order
      await axios.put(`/api/orders/${order.id}`, updatedOrder, tokenData)

      //fetch udpated order
      const updatedNewOrder = axios.get(`/api/orders/${order.id}`, tokenData);
      dispatch(setRecord(updatedNewOrder.data))
      
      navigate(`/orders/${order.id}`)

    }
    catch (err) {
      setDeleteError(true)
    }

  }

    return (
      <Container
        maxWidth="200vw"
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          margin: "30px",
          padding: "30px",
        }}
        component={Paper}
        key={order.id}
      >
        <h3></h3>
        <Typography variant="h6" gutterBottom>
          <b>Order Details</b>
        </Typography>
        <Typography variant="h6" gutterBottom>
          <b>Order #</b>
          {order.id}{" "}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <b>Records purchased:</b>
        </Typography>
        <Button onClick={handleOrderChange}>Cancel Order</Button>
        <Container style={{ display: "flex", gap: "50px", justifyContent: 'center' }} maxWidth="75%">
          {order.records.map((record) => {
            return (
              <Card sx={{ maxWidth: 500 }} key={record.id}>
                <CardMedia
                  component="img"
                  height="50"
                  image={record?.imageUrls[0]?.uri ?? `static/RRR Record.png`}
                  alt="record album"
                />
                <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    <h3>{record.albumName}</h3>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Artist:</b> {record.artist}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">                   <b>Year:</b> {record.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Price:</b> {record.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Quantity:</b> {record.orderRecord.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth={true}
                    sx={{ mr: 5 }}
                    variant="text"
                    size="small"
                    href={`/records/${record.id}`}
                  >
                    More Details
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Container>

        <TableContainer component={Paper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <Table sx={{ maxWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order Date</TableCell>
                <TableCell align="right">{order.datePlaced}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shipping Address</TableCell>
                <TableCell align="right">{order.shippingAddress}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tracking Number</TableCell>
                <TableCell align="right">{order.trackingNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Order Total</TableCell>
                <TableCell align="right">{order.totalCost}</TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>Tracking Number</TableCell>
                <TableCell align="right">{order.shippingAddress}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
        
            </TableBody>
          </Table>
        </TableContainer>
      
      </Container>
    );
  };

export default OrderCard;
