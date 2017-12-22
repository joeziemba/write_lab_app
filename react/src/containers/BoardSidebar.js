import React, { Component } from 'react';
import { Link } from 'react-router';
import CharacterMenu from '../components/CharacterMenu';

class BoardSidebar extends Component {
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
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      debugger;
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
    let background = {
      backgroundImage: "url(" + this.state.image + ")",
      backgroundPosition: "center center",
      backgroundSize: "100%",
    }
    return(
      <div className='grid-x' id='wrapper'>
        <div className='cell large-4 medium-5 hide-for-small-only' id='board-sidebar'>
          <div id='board-image' style={ background } />
          <div className='sidebar-content'>
            <h6>Welcome to</h6>
            <Link to={`/boards/${this.state.boardId}`}><h2>{this.state.name}</h2></Link>
            <hr />
            <p>{this.state.description}</p>
          </div>
        </div>
        <div className='cell large-8 medium-7'>
          <div className='grid-x'>
            <CharacterMenu
              currentCharacterId={this.state.currentCharacter.id}
              currentCharacterName={this.state.currentCharacter.name}
              characters={this.state.characters}
              changeCharacter={this.changeCharacter}
            />
          </div>
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

export default BoardSidebar;
