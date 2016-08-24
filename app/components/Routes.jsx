import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import App from 'components/App';
import CartPage from 'components/CartPage';
import HomePage from 'components/HomePage';
import LoginPage from 'components/LoginPage';
import NotFound from 'components/NotFound';
import PaymentPage from 'components/PaymentPage';
import ProductPage from 'components/ProductPage';
import React from 'react';
import RegisterPage from 'components/RegisterPage';

const Routes = React.createClass({
  handleChange(prevState, nextState, replace) {
    // console.log(prevState);
    // console.log(nextState);
    // console.log(replace);
  },

  handleEnter(event) {
    // console.log(event)
  },

  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/" onChange={this.handleChange}>
        <IndexRoute component={HomePage} />
        <Route
          component={ProductPage}
          path="product/:id"
          // onEnter={this.handleEnter}
        />
        <Route component={LoginPage} path="login" />
        <Route component={RegisterPage} path="register" />
        <Route component={CartPage} path="cart" />
        <Route component={PaymentPage} path="payment" />
        
        {/* The 404 error handler */}
        <Route component={NotFound} path="*" />
      </Route>
    </Router>;
  }
});

export default Routes;
