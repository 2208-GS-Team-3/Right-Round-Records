import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import CartQuantitySelector from "./Cart/CartQuantitySelector";

const RecordCard = ({ record }) => {
  const singleRecordPageUrl = `/records/${record.id}`;

  return (
    <Card
      sx={{
        maxWidth: 290,
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "scroll",
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={record?.imageUrls[0]?.uri ?? `static/RRR Record.png`}
        alt="record album"
      />
      <Typography gutterBottom variant="h5" component="div">
        <h3>{record.albumName}</h3>
      </Typography>
      <CardContent sx={{ display: "flex" }}>
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
          <Typography variant="body2" color="text.secondary">
            <b>Genre(s):</b>{" "}
            {record.genres?.map((genre, index) => (
              <ListItem key={index}>{genre.name} </ListItem>
            ))}
          </Typography>
        </Container>
        <Container>
          <Button
            variant="text"
            href={singleRecordPageUrl}
            size="large"
            style={{ textAlign: "center", color: "gray", margin: "5px" }}
          >
            More Details
          </Button>
          <CartQuantitySelector record={record} />
        </Container>
      </CardContent>
    </Card>
  );
};

export default RecordCard;
