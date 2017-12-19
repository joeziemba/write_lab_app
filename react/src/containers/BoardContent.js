import React, { Component } from 'react';
import ArcTile from '../components/ArcTile';

class BoardContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      threads: []
    }
    this.getThreads = this.getThreads.bind(this);
  }

  getThreads() {
    fetch(`/api/v1/boards/${this.props.boardId}/arcs`, {
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
    this.getThreads();
  }

  render() {
    let arcList = "Looks like there's nothing here!"
    if(this.state.threads.length > 0) {
      arcList = this.state.threads.map(t => {
        return(
          <ArcTile
            key={t.id}
            title={t.title}
            character={t.character}
            postDate={t.created_at}
          />
        )
      })
    }
    return(
      <div id='content-container'>
        {arcList}
      </div>
    )
  }
}

export default BoardContent;
