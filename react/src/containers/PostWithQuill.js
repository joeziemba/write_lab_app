import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ReactQuill from 'react-quill';

class PostWithQuill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      errors: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  handlePost(e) {
    e.preventDefault();
    let post = {
      character_id: this.props.currentCharacterId,
      text: this.state.text,
      arc_id: this.props.params.arc_id
    }
    if(this.props.params.post_id){
      this.props.fetchPost(
        `/api/v1/posts/${this.props.params.post_id}`,
        'PATCH',
        post,
        `/boards/${this.props.params.board_id}/arcs/${this.props.params.arc_id}`
      )
    } else {
      this.props.fetchPost(
        '/api/v1/posts',
        'POST',
        post,
        `/boards/${this.props.params.board_id}/arcs/${this.props.params.arc_id}`
      )
    }
  }

  componentDidMount() {
    if(this.props.params.post_id){
      fetch(`/api/v1/posts/${this.props.params.post_id}`)
      .then(response => response.json())
      .then(body => {
        this.setState({
          text: body.content
        })
      })
    }
  }

  render() {
    return(
      <div>
        <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
        />
        <form name='new_post_form' onSubmit={this.handlePost}>
          <input type='hidden' name='character_id' value={this.props.currentCharacterId} />
          <input type='hidden' name='arc_id' value={this.props.params.arc_id} />
          <input type='submit' value='Post' />
        </form>
      </div>
    )
  }
}

export default PostWithQuill;
