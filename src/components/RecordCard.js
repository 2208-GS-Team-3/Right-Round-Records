import React from "react";
import { Link } from "react-router-dom";

const recordCardImage = {
  width: "200px",
  height: "200px",
};

const RecordCard = ({ record }) => {
  const recordImageObjectString = record.imageUrls[0];

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

  //link to single record
  const singleRecordPageUrl = `/records/${record.id}`
  
  return (
    <div>
      <Link to={singleRecordPageUrl}><h3>{record.albumName}</h3></Link>
      <img style={recordCardImage} src={`${recordAlbumPhoto}`} />
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
