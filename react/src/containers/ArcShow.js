import React, { Component } from 'react';

class ArcShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arcData: {},
      posts: []
    }
  }

  getPosts() {
    fetch(`/api/v1/boards/${this.props.params.board_id}/arcs/${this.props.params.id}`, {
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
        threads: body
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    debugger;
    return(
      <div>
        Hello World
      </div>
    )
  }
}

export default ArcShow;
