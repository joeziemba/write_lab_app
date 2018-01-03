import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ReactQuill from 'react-quill';

class ArcNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arcTitle: '',
      text: '',
      tags: '',
      errors: []
    }
    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);

  }

  handlePostChange(value) {
    this.setState({ text: value })
  }

  handleChange(e) {
    let key = e.target.name
    this.setState({
      [key]: e.target.value
    })
  }

  handlePost(e) {
    e.preventDefault();
    let arc = {
      character_id: this.props.currentCharacterId,
      title: this.state.arcTitle,
      text: this.state.text,
      board_id: this.props.params.board_id,
      tags: this.state.tags
    }
    this.props.fetchPost(
      '/api/v1/arcs',
      'POST',
      arc,
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
            <input id='arc-title-field' name='arcTitle' type='text' placeholder='Arc Title' onChange={this.handleChange} value={this.state.arcTitle} />
          </label>
          <label htmlFor='tags'>
            <input name='tags' type='text' placeholder='Tags seperated by commas' onChange={this.handleChange} value={this.state.tags} />
          </label>
          <ReactQuill
            value={this.state.text}
            onChange={this.handlePostChange}
          />
          <input type='submit' value='Post' className='button' />
        </form>
      </div>
    )
  }
}

export default ArcNew;
