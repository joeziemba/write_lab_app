import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TextField from '../components/TextField';

class ArcEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tags: '',
      errors: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.getArcData = this.getArcData.bind(this);
  }

  getArcData() {
    fetch(`/api/v1/arcs/${this.props.params.arc_id}`, {
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      let tagNames = body.tags.map(tag => {
        return(
          tag.name
        )
      })
      this.setState({
        title: body.title,
        tags: tagNames.join(', ')
      })
    })
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
      title: this.state.title,
      tags: this.state.tags
    }
    this.props.fetchPost(
      `/api/v1/arcs/${this.props.params.arc_id}`,
      'PATCH',
      arc,
      `/boards/${this.props.params.board_id}`
    )
  }
  componentDidMount() {
    this.getArcData();
  }

  render() {
    return(
      <div>
        <div id='arc-header'>
          <h3>Edit Arc</h3>
        </div>
        <form name='editArcForm' onSubmit={this.handlePost}>
          <TextField
            label='Title'
            fieldName='title'
            onChange={this.handleChange}
            value={this.state.title}
          />
          <TextField
            label='Tags (seperated by commas):'
            fieldName='tags'
            onChange={this.handleChange}
            value={this.state.tags}
          />
          <input type='submit' value='Post' className='button' />
        </form>
      </div>
    )
  }
}

export default ArcEdit;
