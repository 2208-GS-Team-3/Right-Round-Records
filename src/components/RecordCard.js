import React from "react";
import { Button } from "@mui/material";

const recordCardImage = {
  width: "200px",
  height: "200px",
};

const RecordCard = ({ record }) => {
  // add item function to update state

  return (
    <div>
      <h3>{record.albumName}</h3>
      <img style={recordCardImage} src={record.imageUrls[0]} />
      <p>Artist: {record.artist}</p>
      {/* <p>{record.description}</p>
      <p>{record.tracks}</p> */}
      <p>{record.year}</p>
      <h4>Price: ${record.price}</h4>
      {/* {record.rating ? <p>{record.rating}</p> : null}
      {record.review ? <p>{record.review}</p> : null} */}
      {/* <Button onClick={addProduct}>Add to cart</Button> */}
    </div>
  );
};

export default RecordCard;
