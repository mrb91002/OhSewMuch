import axios from 'axios';
import React from 'react';
import OrderSummary from 'components/OrderSummary';
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

        // console.log(res);
        // this.setState({ orders: res.data });
      })
      .catch((err) => {
        console.error(err.response);
      });
  },

  render() {
    return <div>

      {this.state.orders.map((ord) => {
          return <OrderSummary
            cart={ord}
            key={weakKey(ord)}
          />
      })}

    </div>;

  }
});

export default OrderHistoryPage;
