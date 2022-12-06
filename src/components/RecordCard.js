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
    for (let i = 25; i < imageObjectString.length; i++) {
      if (imageObjectString[i] === '"') {
        break;
      }
      imageUrl += imageObjectString[i];
    }
    return imageUrl;
  }

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
          <h4>
            <b>Price:</b> ${record.price}
          </h4>
          <h4>Genre: {record.genreName}</h4>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More Details</Button>
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>

    // <Card sx={{ minWidth: 275 }}>
    //   <CardContent>
    //     <Typography variant="h5" component="div">
    //       {/* filter for genre / style here */}
    //       {/* sort component for artist name */}
    //       <h3>{record.albumName}</h3>
    //     </Typography>
    //     <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //       <img style={recordCardImage} src={`${recordAlbumPhoto}`} />
    //     </Typography>
    //     <Typography variant="body2">
    //       <p>
    //         <b>Artist:</b> {record.artist}
    //       </p>
    //       <p>
    //         <b>Year:</b> {record.year}
    //       </p>
    //       <h4>
    //         <b>Price:</b> ${record.price}
    //       </h4>
    //       <h4>Genre: {record.genreName}</h4>
    //       {/* maybe we should put style on the single record page only to declutter */}
    //       {/* <h4>Style: </h4>
    //       {record.styleName && record.styleName.map((style) => <p>{style}</p>)} */}
    //       {/* {record.rating ? <p>{record.rating}</p> : null}
    //   {/* <Button onClick={addProduct}>Add to cart</Button> */}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    // </Card>
  );
};

export default RecordCard;
