import React from 'react';
import { Link } from 'react-router';

const BoardTile = (props) => {
  let background = {
    backgroundImage: "url(" + props.image + ")",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  }
  return(
    <div className='cell medium-10 large-9 xlarge-5 xxlarge-3 board-tile'>
      <div className='grid-x full-height' >
        <div className='cell large-4 medium-4 board-tile-image' style={ background }>
        </div>
        <div className='cell large-8 medium-8 board-tile-content'>
          <div className='grid-x'>
            <div className='cell large-12'>
              <Link to={`/boards/${props.id}`}><h3>{props.name}</h3></Link>
            </div>
          </div>
          <div className='grid-x'>
            <div className='cell large-12'>
              <p>{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardTile;
