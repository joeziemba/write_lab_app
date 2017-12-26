import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class CharacterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characterName: '',
      image: '',
      errors:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Put your functions here
  handleChange(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
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

  // fetchPost(postPath, data, redirectPath) takes 3 arguments:
  //  - url to post to
  //  - variable of object to post (newChar/newPost/etc.)
  //  - url for redirect

  handleSubmit(event) {
    event.preventDefault();
    let newChar = {
      name: this.state.characterName,
      board_id: this.props.params.board_id
    }
    this.props.fetchPost(
      '/api/v1/characters',
      newChar,
      `/boards/${this.props.params.board_id}`
    )
  }

  render() {

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='characterName'>Character Name:
            <input type='text' name="characterName" value={this.state.characterName} onChange={this.handleChange}/>
          </label>
          <input type='submit' value='Create Character' />
        </form>
      </div>
    )
  }
}

export default CharacterForm;
