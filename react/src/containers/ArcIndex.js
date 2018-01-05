import React, { Component } from 'react';
import ArcTile from '../components/ArcTile';
import ArcFilter from '../components/ArcFilter';

class ArcIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arcs: [],
      filter: 'All'
    }
    this.getArcs = this.getArcs.bind(this);
    this.showArcs = this.showArcs.bind(this);
  }

  getArcs(arcTag = '') {
    fetch(`/api/v1/boards/${this.props.params.board_id}/arcs${arcTag}`, {
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
      let filterValue;
      if(arcTag != ''){
        filterValue = `Tagged '${arcTag.substr(1)}'`;
      } else {
        filterValue = 'All'
      }
      this.setState({
        arcs: body,
        filter: filterValue
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getArcs();
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  showArcs() {
    let arcList = "Looks like there's nothing here!"
    if(this.state.arcs.length > 0) {
      let sortedArcs = this.sortByKey(this.state.arcs, 'last_post_date')
      sortedArcs.reverse()
      arcList = sortedArcs.map(a => {
        let lastPost = a.posts.slice(-1)[0];
        let activeArcClass = '';
        if(this.props.lastVisit < lastPost.created_at && lastPost.created_at < this.props.currentVisit) {
          activeArcClass = 'active-arc'
        }
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
            activeArcClass={activeArcClass}
            getArcs={this.getArcs}
            tags={a.tags}
            currentCharacterName={this.props.currentCharacterName}
          />
        )
      })
      this.sortByKey(arcList, )
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
        <ArcFilter
          filter={this.state.filter}
          getArcs={this.getArcs}
        />
        {this.showArcs()}
        {this.props.currentCharacterId > 0 ? this.newArcButton() : null}
      </div>
    )
  }
}

export default ArcIndex;
