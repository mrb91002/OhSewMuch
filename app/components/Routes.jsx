import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import App from 'components/App';
import AdminHomePage from 'components/AdminHomePage';
import CartPage from 'components/CartPage';
import HomePage from 'components/HomePage';
import LoginPage from 'components/LoginPage';
import NotFound from 'components/NotFound';
import OrderHistoryPage from 'components/OrderHistoryPage';
import PaymentPage from 'components/PaymentPage';
import ProductPage from 'components/ProductPage';
import React from 'react';
import RegisterPage from 'components/RegisterPage';
import ThankYouPage from 'components/ThankYouPage';

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
        <Route component={CartPage} path="cart" />
        <Route component={LoginPage} path="login" />
        <Route component={OrderHistoryPage} path="orderhistory" />
        <Route component={PaymentPage} path="payment" />
        <Route component={RegisterPage} path="register" />
        <Route component={ThankYouPage} path="thankyou" />

        <Route component={AdminHomePage} path="adminhome" />

        {/* The 404 error handler */}
        <Route component={NotFound} path="*" />
      </Route>
    </Router>;
  }
});

export default Routes;
