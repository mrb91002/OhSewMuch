import {
  IndexRoute,
  Route,
  Router,
  browserHistory
} from 'react-router';
import AdminHomePage from 'components/AdminHomePage';
import App from 'components/App';
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
  render() {
    return <Router history={browserHistory}>
      <Route component={App} onChange={this.handleChange} path="/">
        <IndexRoute component={HomePage} />

        {/* Client Routes */}
        <Route component={CartPage} path="cart" />
        <Route component={LoginPage} path="login" />
        <Route component={OrderHistoryPage} path="orderhistory" />
        <Route component={PaymentPage} path="payment" />
        <Route component={ProductPage} path="product/:id" />
        <Route component={RegisterPage} path="register" />
        <Route component={ThankYouPage} path="thankyou" />

        {/* Admin Routes */}
        <Route component={AdminHomePage} path="adminhome" />

        {/* The 404 error handler */}
        <Route component={NotFound} path="*" />
      </Route>
    </Router>;
  }
});

export default Routes;
