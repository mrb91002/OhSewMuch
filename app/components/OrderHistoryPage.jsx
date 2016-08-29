import OrderSummary from 'components/OrderSummary';
import React from 'react';
import axios from 'axios';
import weakKey from 'weak-key';

const OrderHistoryPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      orders: []
    };
  },

  componentWillMount() {
    // Get the orders from API
    axios.get('/api/orders')
      .then((res) => {
        this.setState({ orders: res.data });
      })
      .catch((err) => {
        console.error(err.response);// eslint-disable-line no-console
      });
  },

  render() {
    return <div>
      {this.state.orders.map((ord) => {
        return <OrderSummary
          cart={ord}
          key={weakKey(ord)}
        />;
      })}
      <p>this</p>
    </div>;
  }
});

export default OrderHistoryPage;
