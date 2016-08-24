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
        5 Items In Your Cart
      </div>
      <div className="container">
        <div className="row">
          <Paper
            className="col s12 center-align"
            rounded={false}
            style={stylePaper}
            zDepth={3}
          >
            <div className="cart-group">
              <div className="col s9 blue">
                  <div className="col s4"></div>
                  <div className="col s4 align-center">Product Name</div>
                  <div className="col s2 align-center">Qty</div>
                  <div className="col s2 align-center">Price</div>


                {/* <div className="Cart-Product">
                  <div className="col s6 l4 purple">
                    <img src={cartItems[0].images[0].imageUrl} height="150px" width="150px" />
                  </div>
                  <div   className="col s6 l4 orange fill">
                    <p>{cartItems[0].name}</p>
                  </div>
                  <div  className="col s6 l2 purple fill">
                    <p>7</p>
                  </div>
                  <div className="col s16 l2 fill">
                    <p>${cartItems[0].price}</p>
                  </div>
                </div> */}


                {cartItems.map((cartItem) => {
                  return <CartItems
                    key={weakKey(cartItem)}
                    cartItem={cartItem}
                  />
                })}


              </div>

          </div>

          <div className="col s3 green">
            Right Side
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
