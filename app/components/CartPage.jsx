import React from 'react';
import CartItems from 'components/CartItems';
import weakKey from 'weak-key';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';


const CartPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    let cartItems = this.props.cart;

    console.log(cartItems);
    console.log(cartItems.length);
    console.log(cartItems[0]);

    const styleButton = {
      // margin:  "auto",
      // width: "100%"
      // position: 'fixed',
      // top: "60px;"

    };

    const lock = {
      position: "fixed",
      width: "20%",
      top: "140px",
      left: "65%"
    };

    const stylePaper = {
      borderRadius: '5px'
    };

    const styleTable = {
      // position: 'fixed',
      // width: '20%',
      // top: "140px",
      // left: "65%"
    };

    return <div>
      <div className="container">
        <div className="row">
          5 Items In Your Cart
        </div>
      </div>
      <div className="container">
        <div className="row">
          <Paper
            className="col s12 center-align"
            rounded={false}
            style={stylePaper}
            zDepth={3}
          >
            <div className="cart-group row">
              <div className="col s8">
                <div className="row">
                  <div className="col s4 align-center offset-s4">Product Name</div>
                  <div className="col s2 align-center">Qty</div>
                  <div className="col s2 align-center">Price</div>
                </div>

                {cartItems.map((cartItem) => {
                  return <CartItems
                      key={weakKey(cartItem)}
                      cartItem={cartItem}
                    />
                })}


              </div>


              <div className="col s4 blue" style={lock}>
              <div className="flt">
                <table className="green" style={styleTable}>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>$29.95</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>$5.00</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>$34.90</td>
                    </tr>
                  </tbody>

                </table>
              </div>
              <RaisedButton
                // className="buttonCenter"
                label="Proceed To Checkout"
                backgroundColor="rgba(149, 39, 39, 0.9)"
                labelColor="#fff"
                style = {styleButton}
                onTouchTap={this.handleTouchTapCart}
              />
              <p>Additional Duties and Taxes May Apply</p>
              </div>
          </div>


          </Paper>
        </div>
      </div>
      <div className="wrap-clouds2">
        <img src="/images/cloud-third.png" className="third-cloud" alt=""/>
      </div>
    </div>
  }
});

export default CartPage;
