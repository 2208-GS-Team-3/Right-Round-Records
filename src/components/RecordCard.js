import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const RecordCard = ({ record }) => {
  // const recordImageObjectString = record.imageUrls[0];

  //needed to find out how to get the proper url string out of the stringobject of imageUrls
  //we loop through the string, if the type is 'primary' then we slice from index of 25 to the next quotation
  //otherwise we slice from the 'secondary' index of 27 until the end of quotation to pull out the image url
  // function getImageUrl(imageObjectString) {
  //   let imageUrl = "";
  //   if (imageObjectString[9] === "p") {
  //     for (let i = 25; i < imageObjectString.length; i++) {
  //       if (imageObjectString[i] === '"') {
  //         break;
  //       }
  //       imageUrl += imageObjectString[i];
  //     }
  //   } else {
  //     for (let i = 27; i < imageObjectString.length; i++) {
  //       if (imageObjectString[i] === '"') {
  //         break;
  //       }
  //       imageUrl += imageObjectString[i];
  //     }
  //   }
  //   return imageUrl;
  // }

  // const recordAlbumPhoto = getImageUrl(recordImageObjectString);

  const price = "$" + (record.price / 100).toFixed(2);
  
  //link to single record
  const singleRecordPageUrl = `/records/${record.id}`
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={record?.imageUrls[0]?.uri}
        alt="record album"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h3>{record.albumName}</h3>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>
            <b>Artist:</b> {record.artist}
          </span>
          <br></br>
          <span>
            <b>Year:</b> {record.year}
          </span>
          <br></br>
          <span>
            <b>Price:</b> {price}
          </span>
          <br></br>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={singleRecordPageUrl}>More Details</Button>
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default RecordCard;
