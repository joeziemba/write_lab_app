import React from 'react';

const BoardSidebar = (props) => {
  let background = {
    backgroundImage: "url('https://images.fineartamerica.com/images-medium-large-5/sunrise-in-red-cassandra-campbell.jpg')",
    backgroundPosition: "center center",
    backgroundSize: "100%",
  }
  return(
    <div className='cell large-4 medium-5 hide-for-small-only' id='board-sidebar'>
      <div id='board-image' style={background} />
      <div className='sidebar-content'>
        <h6>Welcome to</h6>
        <h2>{props.name}</h2>
        <hr />
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default BoardSidebar;
