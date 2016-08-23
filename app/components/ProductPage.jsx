import React from 'react';
import ProductImages from 'components/ProductImages';
import weakKey from 'weak-key';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';


const ProductPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    $(window).scrollTop(0);
  },

  handleTouchTapCart() {
    const id = Number.parseInt(this.props.params.id);
    const { products } = this.props;
    const product = products.filter((product) => {
      return product.id === id;
    })[0];

    this.props.addToCart(product);
  },

  render() {
    if (this.props.products.length === 0) {
      return <div></div>;
    }

    const styleButton = {
      margin: '50px',
      };

    const id = Number.parseInt(this.props.routeParams.id);
    const product = this.props.products.filter((prod) => {
      return prod.id === id;
    })[0];

    const productPics = product.images.sort((prod1, prod2) => {
      return prod1 < prod2;
    });

    return <div>
      <div className="row product-space container">
        <div className="col s5">
          <img
            className="col s12"
            id="primaryImg"
            src={productPics[0].imageUrl}
          />

            {productPics.map((prodImg) => {
              return <ProductImages
                key={weakKey(prodImg)}
                productImg={prodImg}
              />
            })}

        </div>

        <div className="col s7">
          <div className="col s10 offset-1 product-info-space">
            <div className="col s12 product-info-inner">
              <h1>{product.name}</h1>
              <h5>dimensions: {product.dimensions}</h5>
              <h5 className="col s6">${product.price}</h5>
              <p className="col s4 question">Ask a question</p>


{/*
              <input type="button" value="-"/>
              <label className="show">{3}</label>
              <input
                type="text"
                className="hide"
                maxLength="4"
                size="4"
                placeholder="{4}"
              />
              <input type="button" value="+"/> */}

              <div className="center">
                <RaisedButton
                  className="buttonTest"
                  label="ADD TO CART"
                  backgroundColor="rgba(149, 39, 39, 0.9)"
                  labelColor="#fff"
                  style = {styleButton}
                  onTouchTap={this.handleTouchTapCart}
                />
              </div>

            </div>
          </div>
          <div className="col s10 offset-1 social-media">
            <div className="col s12 product-info-inner">
              <img src="/images/facebook.png" width="65" />
              <img src="/images/twitter.png" width="65" />
              <img src="/images/instagram.png" width="65" />
              <img src="/images/pinterest.png" width="65" />
              <img src="/images/tumblr.png" width="65" />
            </div>
          </div>
        </div>

        <div className="col s12 description">
          <h1>Item Details</h1>
          {product.description}
        </div>
      </div>

      <div className="wrap-clouds2">
        <img src="/images/cloud-third.png" className="third-cloud" alt=""/>
      </div>

    </div>
  }
});

export default ProductPage;
