import React from 'react';
import { withRouter } from 'react-router';

const CartItem = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  handleTouchTap() {
    console.log(this.props.item);
    this.props.router.push(`/product/${this.props.item.product.id}`)
    console.log('test');
  },

  handleDoubleClick() {
    console.log('double clicked');
  },

  render() {
    const item = this.props.item;

    const number = {
      cursor: "pointer",
      borderRadius: "3px",
      width: "35px",
      height: "35px",
      margin: "0 auto",
      textAlign: "center",
      backgroundColor: "#EFEFF4",
      marginTop: "10px",
      paddingTop: "5px"

    }

    console.log('something is going on here');
    return <div className="row">
      <div className="Cart-Product">
        <div className="col s6 l4">
          <img
            src={item.product.images[0].imageUrl}
            width="70%"
            style={{cursor: "pointer" }}
            onTouchTap={this.handleTouchTap}
          />
        </div>
        <div   className="col s6 l4 fill">
          <p>{item.product.name}</p>
        </div>
        <div  className="col s6 l2 fill">
          <input
            onDoubleClick={this.handleDoubleClick}
            style={number}
            value={item.quantity}
          />
        </div>
        <div className="col s16 l2 fill">
          <p>${`${(item.product.price * item.quantity).toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  }
});

export default withRouter(CartItem);
