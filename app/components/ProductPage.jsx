import ProductImages from 'components/ProductImages';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import weakKey from 'weak-key';

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
    const product = products.filter((prod) => {
      return prod.id === id;
    })[0];

    Materialize.toast('Item Added To Cart', 2000, 'rounded');
    this.props.addToCart(product);
  },

  render() {
    if (this.props.products.length === 0) {
      return <div />;
    }

    const styleButton = {
      margin: '50px'
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
              />;
            })}

        </div>

        <div className="col s7">
          <div className="col s10 offset-1 product-info-space">
            <div className="col s12 product-info-inner">
              <h1>{product.name}</h1>
              <h5>dimensions: {product.dimensions}</h5>
              <h5 className="col s6">${product.price}</h5>
              <p className="col s4 question">Ask a question</p>
              <div className="center">
                <RaisedButton
                  backgroundColor="rgba(149, 39, 39, 0.9)"
                  className="buttonTest"
                  label="ADD TO CART"
                  labelColor="#fff"
                  onTouchTap={this.handleTouchTapCart}
                  style={styleButton}
                />
              </div>
            </div>
          </div>
          <div className="col s10 offset-1 social-media">
            <div className="col s12 product-info-inner">
              <img src="/images/Facebook.png" width="65" />
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

      <div className="bottom-clouds footer">
        <img src="/images/bottom-clouds.png" />
      </div>

      <footer>Web Design by - Team Super Secret Squirrel</footer>

    </div>;
  }
});

export default ProductPage;
