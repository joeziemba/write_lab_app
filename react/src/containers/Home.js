import React, { Component } from 'react';
import { Link } from 'react-router'
import BoardIndex from './BoardIndex';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0
    }
  }

  componentDidMount() {
    fetch('/api/v1/authors/current', {
      credentials: 'same-origin'
    })
    .then(response => {
      return response.json()
    })
    .then(body => {
      if(body != null) {
        this.setState({
          userId: body.id
        })
      }
    })
  }

  userButtons() {
    return(
      <div>
        <a href='/authors/sign_in' className='button button-margin'>Log In</a>
        <a href='/authors/sign_up' className='button button-margin'>Sign Up</a>
      </div>
    )
  }

  render() {
    return(
      <div>
        <div id="billboard" className='book-background' >
          <div className="color-overlay">
            <div className="grid-x">
              <div className="cell large-12">
                <h1>WriteLab</h1>
                <h3>Join the Story</h3>
                {this.state.userId == 0 ? this.userButtons() : null}
                <a href='#board-index-container'>
                  <div className='scroll-callout'>
                    <em>Find a Board</em><br />
                    <i className="fa fa-angle-double-down" aria-hidden="true"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <BoardIndex />
      </div>
    )
  }
}

export default Home;
