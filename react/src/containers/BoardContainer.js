import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
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
    this.renderChildren = this.renderChildren.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
  }

  // Component Methods

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

  fetchPost(postPath, data, redirectPath) {
    fetch(postPath, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => this.processResponse(response))
    .then(body => {
      if(postPath === '/api/v1/characters') {
        this.setState({ currentCharacter: body.data })
      }
      if(postPath == '/api/v1/arcs') {
        debugger;
        redirectPath = redirectPath + '/arcs/' + body.data.arc.id
      }
      browserHistory.push(redirectPath);
    })
    .catch(response => {
      this.setState({
        errors: response.data.errors
      });
      let errorMessage = `${response.status} (${response.statusText})`;
      console.error(`Error in fetch: ${errorMessage}`);
    });
  }

  renderChildren() {
    let children;
    children = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          currentCharacterId: this.state.currentCharacter.id,
          currentCharacterName: this.state.currentCharacter.name,
          fetchPost: this.fetchPost
        })
      })
    return children;
  }

  // Lifecycle Methods
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
        <div className='cell large-7 medium-7'>
          <CharacterMenu
            boardId={this.state.boardId}
            currentCharacterId={this.state.currentCharacter.id}
            currentCharacterName={this.state.currentCharacter.name}
            characters={this.state.characters}
            changeCharacter={this.changeCharacter}
          />
          <div className='grid-x'>
            <div className='cell large-12' id='main-content'>
              {this.renderChildren()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BoardContainer;
