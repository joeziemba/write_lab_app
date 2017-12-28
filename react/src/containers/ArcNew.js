import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ReactQuill from 'react-quill';

class ArcNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arcTitle: '',
      text: '',
      errors: []
    }
    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);

  }

  handlePostChange(value) {
    this.setState({ text: value })
  }

  handleTitleChange(e) {
    this.setState({
      arcTitle: e.target.value
    })
  }

  handlePost(e) {
    e.preventDefault();
    let newArc = {
      character_id: this.props.currentCharacterId,
      title: this.state.arcTitle,
      text: this.state.text,
      board_id: this.props.params.board_id
    }
    this.props.fetchPost(
      '/api/v1/arcs',
      newArc,
      `/boards/${this.props.params.board_id}`
    )
  }

  render() {
    return(
      <div>
        <div id='arc-header'>
          <h3>Create a New Arc</h3>
        </div>
        <form name='newArcForm' onSubmit={this.handlePost}>
          <label htmlFor='arcTitle'>
            <input id='arc-title-field' name='arcTitle' type='text' placeholder='Arc Title' onChange={this.handleTitleChange} value={this.state.arcTitle} />
          </label>
          <ReactQuill
            value={this.state.text}
            onChange={this.handlePostChange}
          />
          <input type='submit' value='Post' />
        </form>
      </div>
    )
  }
}

export default ArcNew;
