import React, { Component } from 'react';
import ArcTile from '../components/ArcTile';

class ArcIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arcs: []
    }
    this.getThreads = this.getThreads.bind(this);
    this.showArcs = this.showArcs.bind(this);
  }

  getThreads() {
    fetch(`/api/v1/boards/${this.props.params.board_id}/arcs`, {
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
        arcs: body
     });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getThreads();
  }

  showArcs() {
    let arcList = "Looks like there's nothing here!"
    if(this.state.arcs.length > 0) {
      arcList = this.state.arcs.map(a => {
        let lastPost = a.posts.slice(-1)[0];
        return(
          <ArcTile
            key={a.id}
            id={a.id}
            title={a.title}
            character={a.character.name}
            postDate={a.created_at}
            boardId={this.props.params.board_id}
            lastPostChar={lastPost.character.name}
            lastPostDate={lastPost.created_at}
          />
        )
      })
    }
    return arcList;
  }

  newArcButton() {
    return(
      <div className='grid-x' >
        <div className='small-12 right'>
          <a href={`/boards/${this.props.params.board_id}/arcs/new`} className='button' >
          Create New Arc
        </a>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.showArcs()}
        {this.props.currentCharacterId > 0 ? this.newArcButton() : null}
      </div>
    )
  }
}

export default ArcIndex;
