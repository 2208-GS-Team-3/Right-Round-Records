import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// const recordCardImage = {
//   width: "200px",
//   height: "200px",
// };

const RecordCard = ({ record }) => {
  const recordImageObjectString = record.imageUrls[0];

  // this is working for like 90% of images, but it wont work for all of them that dont have 'primary' types
  //need to find out how to get the proper url string out of the stringobject of imageUrls
  function getImageUrl(imageObjectString) {
    let imageUrl = "";
    if (imageObjectString[9] === "p") {
      for (let i = 25; i < imageObjectString.length; i++) {
        if (imageObjectString[i] === '"') {
          break;
        }
        imageUrl += imageObjectString[i];
      }
    } else {
      for (let i = 27; i < imageObjectString.length; i++) {
        if (imageObjectString[i] === '"') {
          break;
        }
        imageUrl += imageObjectString[i];
      }
    }
    return imageUrl;
  }

  console.log(recordImageObjectString);

  const recordAlbumPhoto = getImageUrl(recordImageObjectString);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={`${recordAlbumPhoto}`}
        alt="record album"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h3>{record.albumName}</h3>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p>
            <b>Artist:</b> {record.artist}
          </p>
          <p>
            <b>Year:</b> {record.year}
          </p>
          <p>
            <b>Price:</b> ${record.price}
          </p>
          <p>Genre: {record.genreName}</p>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More Details</Button>
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default RecordCard;
