import React from 'react';
import { withRouter } from 'react-router';

const CartItems = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  handleTouchTap(event) {
    // this.props.router.push(`/product/${this.props.product.id}`)
    // this.props.router.push(`/product/${event.target.id}`)
    console.log('test');
  },

  render() {

    if (this.props.cartItem.length === 0) {
      console.log('fail');
      return <div></div>
    };

    console.log('something is going on here');
    return <div className="row">
      <div className="Cart-Product">
        <div className="col s6 l4">
          <img
            src={this.props.cartItem.images[0].imageUrl}
            // height="150px"
            width="70%"
            // width="150px"
            onTouchTap={this.handleTouchTap}
          />
        </div>
        <div   className="col s6 l4 fill">
          <p>{this.props.cartItem.name}</p>
        </div>
        <div  className="col s6 l2 fill">
          <p>7</p>
        </div>
        <div className="col s16 l2 fill">
          <p>${`${this.props.cartItem.price * 5}`}</p>
        </div>
      </div>
    </div>
  }
});

export default withRouter(CartItems);
