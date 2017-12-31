var strftime = require('strftime');
var strftimeEST = strftime.timezone('-0500');
import React from 'react';
import { Link } from 'react-router'

const PostTile = (props) => {
  let showDate = (input) => {
    let date = strftimeEST('%b %d, %Y', new Date(input))
    return date
  }
  let postContent = () => {
    return {__html: props.content}
  }

  let utilButtons = () => {
    return(
      <div className='cell small-4 xlarge-2 align-right'>
        <div className='grid-x'>
          <div className='cell small-6'>
            <Link to={`/boards/${props.board_id}/arcs/${props.arc_id}/posts/${props.id}/edit`} className='util-button-dark'>Edit</Link>
          </div>
          <div className='cell small-6'>
            <form id={props.id} onSubmit={props.delete}><input type='submit' value='Delete' className='util-button-dark' /></form>
          </div>
        </div>
      </div>
    )
  }
  return(
    <div className='post-tile grid-x'>
      <div className='character-content cell large-3'>
        <h4>{props.character}</h4>
        <img src={props.avatar} />
      </div>
      <div className='post-body cell large-9 medium-12'>
        <div className='grid-x'>
          <div className='cell small-8 xlarge-10 post-date'>
            Posted {showDate(props.postDate)}
          </div>
          {props.character == props.currentCharacterName ? utilButtons() : null}
          <div className='cell medium-12' dangerouslySetInnerHTML={postContent()}></div>
        </div>
      </div>
    </div>
  )
}

export default PostTile;
