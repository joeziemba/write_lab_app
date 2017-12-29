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
              <h2>Join the Story</h2>
              <Link to='/authors/sign_in'>Log In</Link>
              <Link to='/authors/sign_up'>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
      <BoardIndex />
    </div>
  )
}

export default Home;
