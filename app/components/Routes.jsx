import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import App from 'components/App';
import Home from 'components/Home';
import React from 'react';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={Home} />
        {/* <Route component={Posts} path="topics/:topic" /> */}
      </Route>
    </Router>;
  }
});

export default Routes;
