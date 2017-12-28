import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class EditCharacter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      backstory: '',
      age: '',
      avatar_url: '',
      errors:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCharacter = this.getCharacter.bind(this);
  }

  // Put your functions here
  handleChange(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
  }

  getCharacter() {
    fetch(`/api/v1/characters/${this.props.params.id}`)
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
        name: body.name,
        avatar_url: body.avatar_url,
        backstory: body.backstory,
        age: body.age
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  // fetchPost(postPath, method, data, redirectPath) takes 3 arguments:
  //  - url to post to
  //  - variable of object to post (newChar/newPost/etc.)
  //  - url for redirect

  handleSubmit(event) {
    event.preventDefault();
    let newData = {
      name:       this.state.name,
      age:        this.state.age,
      backstory:  this.state.backstory,
      avatar_url: this.state.avatar_url
    }
    this.props.fetchPost(
      `/api/v1/characters/${this.props.params.id}`,
      'PATCH',
      newData,
      `/boards/${this.props.params.board_id}`
    )
  }

  componentDidMount() {
    this.getCharacter();
  }

  render() {

    return(
      <div>
        <h4>Edit Character</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Character Name:
            <input type='text' name="name" value={this.state.name} onChange={this.handleChange}/>
          </label>
          <label htmlFor='avatar_url'>Avatar:<br />
            <img id='edit-avatar' src={this.state.avatar_url} />
            <input type='text' name='avatar_url' value={this.state.avatar_url} onChange={this.handleChange} />
          </label>
          <label htmlFor='age'>Age:
            <input type='text' name='age' value={this.state.age} onChange={this.handleChange} />
          </label>
          <label htmlFor='backtory'>Backstory:
            <textarea name='backstory' value={this.state.backstory} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Save Changes' />
        </form>
      </div>
    )
  }
}

export default EditCharacter;
