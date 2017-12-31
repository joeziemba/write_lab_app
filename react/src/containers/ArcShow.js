import React, { Component } from 'react';
import { Link } from 'react-router'

import PostTile from '../components/PostTile';

var strftime = require('strftime');
var strftimeEST = strftime.timezone('-0500');

class ArcShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arcData: {},
      creator: '',
      posts: []
    }
    this.getPosts = this.getPosts.bind(this);
    this.mapPosts = this.mapPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  getPosts() {
    fetch(`/api/v1/arcs/${this.props.params.arc_id}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        arcData: body,
        creator: body.character.name,
        posts: body.posts
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  showDate(input) {
    let date = strftimeEST('%b %d, %Y', new Date(input))
    return date
  }

  componentDidMount() {
    this.getPosts();
  }

  mapPosts() {
    let posts = this.state.posts.map(post => {
      return(
        <PostTile
          key={post.id}
          board_id={this.props.params.board_id}
          arc_id={this.props.params.arc_id}
          id={post.id}
          content={post.content}
          character={post.character.name}
          avatar={post.character.avatar_url}
          postDate={post.created_at}
          delete={this.deletePost}
          currentCharacterName={this.props.currentCharacterName}
        />
      )
    })
    return posts;
  }

  deletePost(event) {
    event.preventDefault()
    fetch(`/api/v1/posts/${event.target.id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => this.getPosts())
  }

  render() {
    return(
      <div>
        <div id='arc-header'>
          <h3>{this.state.arcData.title}</h3>
          <div>
            <i>Posted by:&nbsp;</i> {this.state.creator}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {this.showDate(this.state.arcData.created_at)}
          </div>
        </div>
        <div>
          {this.mapPosts()}
        </div>
        <div>
          <Link to={`/boards/${this.props.params.board_id}/arcs/${this.props.params.arc_id}/posts/new`}>Add New Post</Link>
        </div>
      </div>
    )
  }
}

export default ArcShow;
