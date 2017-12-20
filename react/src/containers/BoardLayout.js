import React, { Component } from 'react';
import BoardSidebar from '../components/BoardSidebar';
import BoardContent from './BoardContent';

class BoardLayout extends Component {
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
    fetch(`/api/v1/boards/${this.props.params.id}`, {
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
    return(
      <div className='grid-x'>
        <BoardSidebar
          name={this.state.name}
          description={this.state.description}
          image={this.state.image}
        />
        <BoardContent
          boardId={this.props.params.id}
        />
      </div>
    )
  }
}

export default BoardLayout;
