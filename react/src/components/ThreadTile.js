import React from 'react';

const ThreadTile = (props) => {

  return(
    <div>
      <h3>{props.title}</h3>
      posted by: {props.character.name}
      posted: {props.postDate}
    </div>
  )
}

export default ThreadTile;
