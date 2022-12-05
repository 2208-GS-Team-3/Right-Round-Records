import React from "react";

const recordCardImage = {
  width: "200px",
  height: "200px",
};

const RecordCard = ({ record }) => {
  console.log({ record });
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

  return (
    <div>
      <h3>{record.albumName}</h3>
      <img style={recordCardImage} src={`${recordAlbumPhoto}`} />
      <p>Artist: {record.artist}</p>
      {/* <p>{record.description}</p>
      <p>{record.tracks}</p> */}
      <p>{record.year}</p>
      <h4>Price: ${record.price}</h4>
      <h4>Genre: {record.genreName}</h4>
      <h4>Style: </h4>
      {record.styleName && record.styleName.map((style) => <p>{style}</p>)}
      {/* {record.rating ? <p>{record.rating}</p> : null}
      {record.review ? <p>{record.review}</p> : null} */}
      {/* <Button onClick={addProduct}>Add to cart</Button> */}
    </div>
  );
};

export default RecordCard;
