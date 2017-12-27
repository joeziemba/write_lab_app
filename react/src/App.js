// React Imports
import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
// Local Component Imports
import BoardContainer from './containers/BoardContainer';
import ArcIndex       from './containers/ArcIndex';
import ArcNew         from './containers/ArcNew';
import ArcShow        from './containers/ArcShow';
import PostWithQuill  from './containers/PostWithQuill';
import CharacterForm  from './containers/CharacterForm';

const App = (props) => {
  return(
    <Router history={browserHistory}>
        <Route path='/'>
          <Route path='/boards/:board_id' component={BoardContainer}>
            <IndexRoute component={ArcIndex} />
            <Route path='arcs/new' component={ArcNew} />
            <Route path='arcs/:id' component={ArcShow} />
            <Route path='arcs/:id/posts/new' component={PostWithQuill} />
            <Route path='characters/new' component={CharacterForm} />
          </Route>
        </Route>
    </Router>
  )
}

export default App;
