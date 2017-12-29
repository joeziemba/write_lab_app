import React from 'react';
import BoardIndex from '../containers/BoardIndex';

const BoardIndexHeader = (props) => {

  return(
    <div>
      <div className='grid-x book-background'>
        <div className='color-overlay'>
          <div className='cell large-12' id='index-header'>
            <h1 className='center'>Boards</h1>
          </div>
        </div>
      </div>
      <BoardIndex />
  </div>
  )
}

export default BoardIndexHeader;
