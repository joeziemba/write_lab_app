var strftime = require('strftime')
var strftimeEST = strftime.timezone('-0500');
import React from 'react';
import { Link } from 'react-router';

const ArcTile = (props) => {
  let showDate = (input) => {
    let date = strftimeEST('%b %d, %Y', new Date(input))
    return date
  }
  return(
    <div className='arc-tile-container'>
      <div className='arc-tile grid-x'>
        <div className='cell large-8 medium-12'>
          <h4><Link to={`/boards/${props.boardId}/arcs/${props.id}`}>{props.title}</Link></h4>
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
