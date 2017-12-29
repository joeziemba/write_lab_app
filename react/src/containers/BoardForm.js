import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TextField from '../components/TextField';

class BoardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1500445113926-4b0454111bc9?auto=format&fit=crop&w=2528&q=80',
      errors: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
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
      response.status < 400 ? func = resolve : func = reject;
      response.json().then(data => func({
        'status': response.status,
        'statusText': response.statusText,
        'data': data
      }));
    });
  }

  fetchPost(postPath, method, data) {
    fetch(postPath, {
      credentials: 'same-origin',
      method: method,
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => this.processResponse(response))
    .then(body => {
      browserHistory.push(`/boards/${body.data.id}`);
    })
    .catch(response => {
      this.setState({
        errors: response.data.errors
      });
      let errorMessage = `${response.status} (${response.statusText})`;
      console.error(`Error in fetch: ${errorMessage}`);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newBoard = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image
    }
    this.fetchPost('/api/v1/boards', 'POST', newBoard)
  }

  componentDidMount() {
    if(this.props.params.board_id) {
      fetch(`/api/v1/boards/${this.props.params.board_id}`)
      .then(response => response.json())
      .then(body => {
        this.setState({
          name: body.boardData.name,
          description: body.boardData.description,
          image: body.boardData.image
        })
      })
    }
  }

  render() {
    let action = 'Create'
    if(this.props.params.board_id){
      action = 'Edit'
    }
    return(
      <div className='book-background browser-height'>
        <div className="color-overlay browser-height center">
          <div className='grid-x'>
            <div className="cell large-4 large-offset-4 center-vertical form-container">
              <h2>{ action } Board</h2>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  fieldName='name'
                  label='Board Title:'
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label htmlFor='description'>Board Description:</label>
                <textarea
                  name='description'
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <label>Cover Image</label>
                <p>Paste an image URL below</p>
                <img id='edit-avatar' src={this.state.image} />
                <TextField
                  fieldName='image'
                  label=''
                  value={this.state.image}
                  onChange={this.handleChange}
                />
                <input type='submit' className='button' value={ action } />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BoardForm;
