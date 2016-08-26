import React from 'react';
import { withRouter } from 'react-router';

const CartItem = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      quantity: this.props.item.quantity
    };
  },

  handleTouchTap() {
    this.props.router.push(`/product/${this.props.item.product.id}`)
  },

  handleDoubleClick() {

    this.props.updateCart(this.props.item);

  },

  handleChange(event){
    // console.log(this.state.quantity);
    let nextQuantity = event.target.value;

    if (nextQuantity === '') {
      return this.setState({ quantity: '' })
    }

    if (isNaN(nextQuantity) || nextQuantity <= 0 || nextQuantity >= 100) {
      return;
    }

    nextQuantity = Number.parseInt(nextQuantity);

    this.setState({ quantity: nextQuantity });
  },

  handleDelete() {
    console.log('this is set for delete');
    console.log(this.props);
    this.props.removeFromCart(this.props.item);
  },

  handleEnter(event) {
    if (this.state.quantity === '') {
      return;
    }

    if (event.which !== 13) {
      return;
    };

    this.props.updateCart(this.props.item, this.state.quantity);
  },

  handleBlur(event) {
    if (this.state.quantity === '') {
      return;
    };

    this.props.updateCart(this.props.item, this.state.quantity);
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

    return <div className="row">
      <div className="Cart-Product">
        <div className="col s6 l4">
          <img
            src={item.product.images[0].imageUrl}
            width="70%"
            style={{cursor: "pointer", paddingLeft: "40px" }}
            onTouchTap={this.handleTouchTap}
          />
        </div>
        <div   className="col s6 l4 fill">
          <p>{item.product.name}</p>
          <p>measurements: {item.product.dimensions} </p>
          <p
            style={{color: "red", cursor:"pointer"}}
            onTouchTap={this.handleDelete}
          >
            Delete
          </p>
        </div>
        <div  className="col s6 l2 ">
          <input
            // onDoubleClick={this.handleDoubleClick}
            onChange={this.handleChange}
            onKeyUp={this.handleEnter}
            onBlur={this.handleBlur}
            style={number}
            value={this.state.quantity}
          />
        </div>
        <div className="col s16 l2 ">
          <p>${`${(item.product.price * item.quantity).toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  }
});

export default withRouter(CartItem);
