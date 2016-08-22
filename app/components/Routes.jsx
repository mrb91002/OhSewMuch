import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import App from 'components/App';
import HomePage from 'components/HomePage';
import React from 'react';
import ProductPage from 'components/ProductPage';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={HomePage} />
        <Route component={ProductPage} path="product/:name" />
      </Route>
    </Router>;
  }
});

export default Routes;
