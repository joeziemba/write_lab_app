import React, { Component } from 'react';
import { browserHistory} from 'react-router';
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

  processResponse(response) {
    return new Promise((resolve, reject) => {
      let func;
      debugger;
      response.status < 400 ? func = resolve : func = reject;
      response.json().then(data => func({
        'status': response.status,
        'statusText': response.statusText,
        'data': data
      }));
    });
  }

  handlePost(e) {
    e.preventDefault();
    let newPost = {
      character_id: this.props.currentCharacterId,
      text: this.state.text,
      arc_id: this.props.params.id
    }
    fetch(`/api/v1/posts`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => this.processResponse(response))
    .then(body => {
      debugger;
      browserHistory.push(`/boards/${this.props.params.board_id}/arcs/${this.props.params.id}`);
    })
    .catch(response => {
      debugger;
      this.setState({
        errors: response.data.errors
      });
      let errorMessage = `${response.status} (${response.statusText})`;
      console.error(`Error in fetch: ${errorMessage}`);
    });
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
          <input type='hidden' name='arc_id' value={this.props.params.id} />
          <input type='submit' value='Post' />
        </form>
      </div>
    )
  }
}

export default PostWithQuill;
