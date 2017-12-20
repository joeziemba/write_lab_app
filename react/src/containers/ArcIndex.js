import React, { Component } from 'react';
import ArcTile from '../components/ArcTile';

class ArcIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arcs: []
    }
    this.getThreads = this.getThreads.bind(this);
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

  render() {
    let arcList = "Looks like there's nothing here!"
    if(this.state.arcs.length > 0) {
      arcList = this.state.arcs.map(a => {
        return(
          <ArcTile
            key={a.id}
            id={a.id}
            title={a.title}
            character={a.character}
            postDate={a.created_at}
            boardId={this.props.params.board_id}
          />
        )
      })
    }
    return(
      <div id='arc-container'>
        {arcList}
      </div>
    )
  }
}

export default ArcIndex;
