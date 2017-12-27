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
    return arcList;
  }

  render() {
    return(
      <div>
        {this.showArcs()}
        <div  className='grid-x'>
          <a href={`/boards/${this.props.params.board_id}/arcs/new`} >
          <div id='new-arc-tile' className='large-12 medium-12 small-12'>
            <h4>Create New Arc</h4>
          </div>
        </a>
        </div>
      </div>
    )
  }
}

export default ArcIndex;
