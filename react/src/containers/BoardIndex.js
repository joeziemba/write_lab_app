import React, { Component } from 'react';
import BoardTile        from '../components/BoardTile'
import BoardIndexHeader from '../components/BoardIndexHeader'

class BoardIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boards: []
    }
    this.getBoards = this.getBoards.bind(this);
  }

  getBoards() {
    fetch('/api/v1/boards')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(body => {
      this.setState({
       boards: body
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getBoards();
  }

  showBoards() {
    let boards = this.state.boards.map(board => {
      return(
        <BoardTile
          key={board.id}
          id={board.id}
          name={board.name}
          description={board.description}
          image={board.image}
        />
      )
    })
    return boards;
  }

  render() {
    return(
      <div>
        <div id='board-index-container' className='grid-x align-center'>
          {this.showBoards()}
        </div>
      </div>
    )
  }
}

export default BoardIndex;
