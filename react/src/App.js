import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import BoardSidebar from './containers/BoardSidebar';
import ArcIndex     from './containers/ArcIndex';

const App = (props) => {
  return(
    <Router history={browserHistory}>
        <Route path='/'>
          <Route path='boards/:id' component={BoardSidebar}>
            <IndexRoute component={ArcIndex} />
          </Route>
        </Route>
    </Router>
  )
}

export default App;
