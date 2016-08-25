import React from 'react';
import { withRouter } from 'react-router';

const CartItem = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  handleTouchTap(event) {
    // this.props.router.push(`/product/${this.props.product.id}`)
    // this.props.router.push(`/product/${event.target.id}`)
    console.log('test');
  },

  render() {
    const item = this.props.item;

    // if (!this.props.length) {
    //   console.log('fail');
    //   return <div></div>
    // };

    console.log('something is going on here');
    return <div className="row">
      <div className="Cart-Product">
        <div className="col s6 l4">
          <img
            src={item.product.images[0].imageUrl}
            // height="150px"
            width="70%"
            // width="150px"
            onTouchTap={this.handleTouchTap}
          />
        </div>
        <div   className="col s6 l4 fill">
          <p>{item.product.name}</p>
        </div>
        <div  className="col s6 l2 fill">
          <p>{item.quantity}</p>
        </div>
        <div className="col s16 l2 fill">
          <p>${`${(item.product.price * item.quantity).toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  }
});

export default withRouter(CartItem);
