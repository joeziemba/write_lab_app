import React from 'react';

const ArcTile = (props) => {

  return(
    <div>
      <h3>{props.title}</h3>
      posted by: {props.character.name}&nbsp;
      posted: {props.postDate}
    </div>
  )
}

export default ArcTile;
