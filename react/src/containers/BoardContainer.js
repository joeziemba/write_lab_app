import React, { Component } from 'react';
import { Link } from 'react-router';
import CharacterMenu  from '../components/CharacterMenu';
import BoardSidebar   from '../components/BoardSidebar';

class BoardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      image: '',
      boardId: '',
      currentAuthor: {},
      characters: [],
      currentCharacter: {}
    }
    this.changeCharacter = this.changeCharacter.bind(this);
  }

  // Put your functions here

  changeCharacter(event) {
    let newChar = this.state.characters.filter( c => c.id == event.target.value)
    this.setState({
      currentCharacter: newChar[0]
    })
  }

  getBoardData() {
    fetch(`/api/v1/boards/${this.props.params.board_id}`, {
      credentials: 'same-origin'
    })
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
       name: body.boardData.name,
       description: body.boardData.description,
       image: body.boardData.image,
       boardId: body.boardData.id,
       currentAuthor: body.currentAuthor,
       characters: body.characters,
       currentCharacter: body.characters[0]
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getBoardData();
  }

  render() {
    return(
      <div className='grid-x' id='wrapper'>
          <BoardSidebar
            image={this.state.image}
            boardId={this.state.boardId}
            boardName={this.state.name}
            boardDesc={this.state.description}
          />
        <div className='cell large-8 medium-7'>
          <CharacterMenu
            currentCharacterId={this.state.currentCharacter.id}
            currentCharacterName={this.state.currentCharacter.name}
            characters={this.state.characters}
            changeCharacter={this.changeCharacter}
          />
          <div className='grid-x'>
            <div className='cell large-12' id='main-content'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BoardContainer;
