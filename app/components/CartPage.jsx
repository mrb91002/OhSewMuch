import { withRouter } from 'react-router';
import CartItem from 'components/CartItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import weakKey from 'weak-key';


const CartPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  handleTouchTapCheckout() {
    this.props.router.push('/payment');
  },

  render() {
    const cart = this.props.cart;

    const quantity = cart.reduce((accum, item) => {
      return accum + item.quantity;
    }, 0);

    const subTotal = cart.reduce((accum, item) => {
      return accum + item.quantity * item.product.price;
    }, 0);

    console.log(cart);


    const styleButton = {
    };


    const lock = {
      position: "fixed",
      width: "20%",
      top: "140px",
      left: "65%"
    };

    const stylePaper = {
      borderRadius: '5px',
      minHeight: '500px'
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
          <h5>{quantity} Items In Your Cart </h5>
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
              <div className="col s8 border-right">
                <div className="section">
                  <div className="row">
                    <div className="col s4 align-center offset-s4">
                      Product Name
                    </div>
                    <div className="col s2 align-center">Qty</div>
                    <div className="col s2 align-center">Price</div>
                  </div>
                  <div className="divider"
                    style = {{
                      backgroundColor: "rgb(149, 39, 39)",
                      border: "0px"
                    }}>
                  </div>
                </div>
                {cart.map((item) => {
                  return <CartItem
                      key={weakKey(item)}
                      item={item}
                      updateCart={this.props.updateCart}
                    />
                })}


              </div>


              <div className="col s4" style={lock}>
              <div className="flt">
                <table style={styleTable}>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>${subTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>tax</td>
                      <td>WA Only</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>FREE</td>
                    </tr>
                    <tr className="border-top">
                      <td>Total</td>
                      <td>${subTotal.toFixed(2)}</td>
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
                onTouchTap={this.handleTouchTapCheckout}
              />
              <p>Additional Duties and Taxes May Apply</p>
              </div>
          </div>


          </Paper>
        </div>
      </div>


      <div className="bottom-clouds footer">
       <img src="/images/bottom-clouds.png" />
      </div>

      <footer>
        {/* <p> */}
          Web Design by - Team Super Secret Squirrel
        {/* </p> */}
      </footer>

    </div>
  }
});

export default withRouter(CartPage);
