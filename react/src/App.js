import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import BoardLayout from './containers/BoardLayout'

const App = (props) => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' />
        <Route path='/boards/:id' component={BoardLayout} />
      </Router>
    </div>
  )
}

export default App;
