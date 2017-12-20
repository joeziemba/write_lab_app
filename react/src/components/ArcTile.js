var strftime = require('strftime')
var strftimeEST = strftime.timezone('-0500');
import React from 'react';

const ArcTile = (props) => {
  let showDate = () => {
    let date = strftimeEST('%b %d, %Y')
    return date
  }
  return(
    <div className='arc-tile-container'>
      <div className='arc-tile grid-x'>
        <div className='cell large-8 medium-12'>
          <h4>{props.title}</h4>
        </div>
        <div className='cell large-2 medium-6'>
          {props.character.name}&nbsp;
        </div>
        <div className='cell large-2 medium-6'>
          {showDate(props.postDate)}
        </div>
      </div>
      <div className='grid-x arc-details'>
        Tags:
      </div>
    </div>
  )
}

export default ArcTile;
