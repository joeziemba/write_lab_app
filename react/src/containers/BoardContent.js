import React, { Component } from 'react';
import ThreadTile from '../components/ThreadTile';

class BoardContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      threads: []
    }
    this.getThreads = this.getThreads.bind(this);
  }

  getThreads() {
    fetch(`/api/v1/boards/${this.props.boardId}/story_arcs`, {
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
    let threadList = this.state.threads.map(t => {
      return(
        <ThreadTile
          key={t.id}
          title={t.title}
        />
      )
    })
    return(
      <div id='content-container'>
        Hello
        {threadList}
      </div>
    )
  }
}

export default BoardContent;
