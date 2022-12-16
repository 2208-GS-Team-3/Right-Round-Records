import React from "react";
import Card from "@mui/material/Card";
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container
} from "@mui/material";
import CartQuantitySelector from "./Cart/CartQuantitySelector";

const RecordCard = ({ record }) => {
  const singleRecordPageUrl = `/records/${record.id}`;


  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardMedia
        component="img"
        height="300"
        image={record?.imageUrls[0]?.uri ?? `static/RRR Record.png`}
        alt="record album"
      />
        <Typography gutterBottom variant="h5" component="div">
          <h3>{record.albumName}</h3>
        </Typography>
      <CardContent sx={{display: 'flex'}}>
        <Container>
        <Typography variant="body2" color="text.secondary">
            <b>Artist:</b> {record.artist}
            </Typography>
        <Typography variant="body2" color="text.secondary">
            <b>Year:</b> {record.year}
            </Typography>
        <Typography variant="body2" color="text.secondary">
            <b>Price:</b> {record.price}
            </Typography>
            </Container>
            <Container>
        <Typography variant="body2" color="text.secondary">
            <b>Genre(s):</b>{" "}
            {record.genres?.map((genre, index) => (
              <li key={index}>{genre.name} </li>
            ))}
            </Typography>
            </Container>


      </CardContent>
      <CardActions>
        <Button
          sx={{ mr: 5 }}
          variant="text"
          size="small"
          href={singleRecordPageUrl}
        >
          More Details
        </Button>
        <CartQuantitySelector record={record} />
      </CardActions>
    </Card>
  );
};

export default RecordCard;
