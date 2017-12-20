import React, { Component } from 'react';

class BoardSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      image: '',
      boardId: ''
    }
  }

  // Put your functions here
  getBoardData() {
    fetch(`/api/v1/boards/${this.props.params.board_id}`, {
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
       name: body.name,
       description: body.description,
       image: body.image,
       boardId: body.id
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getBoardData();
  }

  render() {
    let background = {
      backgroundImage: "url(" + this.state.image + ")",
      backgroundPosition: "center center",
      backgroundSize: "100%",
    }
    return(
      <div className='grid-x'>
        <div className='cell large-4 medium-5 hide-for-small-only' id='board-sidebar'>
          <div id='board-image' style={ background } />
          <div className='sidebar-content'>
            <h6>Welcome to</h6>
            <h2>{this.state.name}</h2>
            <hr />
            <p>{this.state.description}</p>
          </div>
        </div>
        <div className='cell large-8 medium-7' id='main-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default BoardSidebar;
