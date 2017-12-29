import React from 'react';
import { Link } from 'react-router'
import BoardIndex from './BoardIndex';

const Home = (props) => {

  return(
    <div>
      <div id="billboard" className='book-background' >
        <div className="color-overlay">
          <div className="grid-x">
            <div className="cell large-12">
              <h1>WriteLab</h1>
              <h3>Join the Story</h3>
              <a href='/authors/sign_in' className='button button-margin'>Log In</a>
              <a href='/authors/sign_up' className='button button-margin'>Sign Up</a>
              <br />
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

export default Home;
