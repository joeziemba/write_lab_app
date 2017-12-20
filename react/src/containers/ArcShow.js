import React, { Component } from 'react';
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
  }

  getPosts() {
    fetch(`/api/v1/arcs/${this.props.params.id}`, {
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

  render() {
    let posts = this.state.posts.map(post => {
      return(
        <PostTile
          key={post.id}
          content={post.content}
          character={post.character.name}
          avatar={post.character.avatar_url}
          postDate={post.created_at}
        />
      )
    })
    return(
      <div>
        <div id='arc-header'>
          <h3>{this.state.arcData.title}</h3>
          <div>
            <i>Posted by:&nbsp;</i> {this.state.creator}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {this.showDate(this.state.arcData.created_at)}
          </div>
        </div>
        <div>
          {posts}
        </div>
      </div>
    )
  }
}

export default ArcShow;
