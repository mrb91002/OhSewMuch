import React from 'react';
import CartItems from 'components/CartItems';
import weakKey from 'weak-key';
import Paper from 'material-ui/Paper';


const CartPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    let cartItems = this.props.cart;

    if (!cartItems.length) {
        return <div>your cart is empty</div>
    };

    console.log(cartItems);
    console.log(cartItems.length);
    console.log(cartItems[0]);

    const stylePaper = {
      borderRadius: '5px'
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
              <div className="col s9">
                <div className="row">
                  <div className="col s4 align-center offset-s4">Product Name</div>
                  <div className="col s2 align-center">Qty</div>
                  <div className="col s2 align-center">Price</div>
                </div>

                {cartItems.map((cartItem) => {
                  return <div className="row">
                    <CartItems
                      key={weakKey(cartItem)}
                      cartItem={cartItem}
                    />
                  </div>
                })}


              </div>

              <div className="col s3">
              Right Side
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
