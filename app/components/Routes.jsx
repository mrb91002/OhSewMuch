import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import App from 'components/App';
import HomePage from 'components/HomePage';
import NotFound from 'components/NotFound';
import React from 'react';
import ProductPage from 'components/ProductPage';
import LoginPage from 'components/LoginPage';
import RegisterPage from 'components/RegisterPage';
import Cart from 'components/Cart';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={HomePage} />
        <Route component={ProductPage} path="product/:id" />
        <Route component={LoginPage} path="login" />
        <Route component={RegisterPage} path="register" />
        <Route component={Cart} path="cart" />
        {/* The 404 error handler */}
        <Route component={NotFound} path="*" />
      </Route>
    </Router>;
  }
});

export default Routes;
