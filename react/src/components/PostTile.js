var strftime = require('strftime');
var strftimeEST = strftime.timezone('-0500');
import React from 'react';

const PostTile = (props) => {
  let showDate = (input) => {
    let date = strftimeEST('%b %d, %Y', new Date(input))
    return date
  }
  let postContent = () => {
    return {__html: props.content}
  }
  return(
    <div className='post-tile grid-x'>
      <div className='character-content cell large-3'>
        <h4>{props.character}</h4>
        <img src={props.avatar} />
      </div>
      <div className='post-body large-9'>
        <div className='post-date'>Posted {showDate(props.postDate)}</div>
        <div dangerouslySetInnerHTML={postContent()}></div>
      </div>
    </div>
  )
}

export default PostTile;
