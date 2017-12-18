import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import React from 'react';

const App = (props) => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={Home}>
        </Route>
      </Router>
    </div>
  )
}

export default App;
