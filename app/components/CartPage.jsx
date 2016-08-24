import React from 'react';
import ProductInGrid from 'components/ProductInGrid';
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

          <div className="col s9 blue">

            <div>
              <div className="Cart-Product">
                <div className="col s4 purple">
                <img src={cartItems[0].images[0].imageUrl} height="150px" width="150px" />
                </div>
                <div height="156px"  className="col s4 orange">{cartItems[0].name}</div>
                <div height="156px"  className="col s2 purple">
                  <p>7</p>
                </div>
                <div height="156px" className="col s2">{cartItems[0].price}</div>
              </div>
            </div>
{/*
            <div className="row">
              <div className="Cart-Product">
                <div className="col s4 purple">
                <img src={cartItems[0].images[0].imageUrl} height="150px" width="150px" />
                </div>
                <div className="col s4 orange">{cartItems[0].name}</div>
                <div className="col s2 purple">{7}</div>
                <div className="col s2 orange">{cartItems[0].price}</div>
              </div>
            </div> */}

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
