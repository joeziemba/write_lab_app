import React from 'react';
import { Link } from 'react-router';

const BoardSidebar = (props) => {
  let background = {
    backgroundImage: "url(" + props.image + ")",
    backgroundPosition: "center center",
    backgroundSize: "100%",
  }
  let editBoard;
  if(props.currentAuthor == props.boardAuthorId) {
    editBoard = <a href={`/boards/${props.boardId}/edit`} className='util-button-dark'><i className="fa fa-pencil"></i>&nbsp; Edit Board</a>
  }
  return(
    <div className='cell large-5 medium-5 hide-for-small-only' id='board-sidebar'>
      <div id='board-image' style={ background } />
      <div className='sidebar-content'>
        { editBoard }
        <h6>Welcome to</h6>
        <Link to={`/boards/${props.boardId}`}><h2>{props.boardName}</h2></Link>
        <hr />
        <p>{props.boardDesc}</p>
      </div>
    </div>
  )
}

export default BoardSidebar;
