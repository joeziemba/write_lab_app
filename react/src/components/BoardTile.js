import React from 'react';

const BoardTile = (props) => {
  let background = {
    backgroundImage: "url(" + props.image + ")",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  }
  return(
    <div className='cell large-6 board-tile'>
      <div className='grid-x full-height' >
        <div className='cell large-4 medium-12 board-tile-image' style={ background }>
        </div>
        <div className='cell large-8 medium-12 board-tile-content'>
          <div className='grid-x'>
            <div className='cell large-12'>
              <h3>{props.name}</h3>
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
