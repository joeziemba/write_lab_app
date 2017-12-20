// React Imports
import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
// Local Component Imports
import BoardSidebar from './containers/BoardSidebar';
import ArcIndex     from './containers/ArcIndex';
import ArcShow      from './containers/ArcShow';

const App = (props) => {
  return(
    <Router history={browserHistory}>
        <Route path='/'>
          <Route path='/boards/:board_id' component={BoardSidebar}>
            <IndexRoute component={ArcIndex} />
            <Route path='arcs/:id' component={ArcShow} />
          </Route>
        </Route>
    </Router>
  )
}

export default App;
