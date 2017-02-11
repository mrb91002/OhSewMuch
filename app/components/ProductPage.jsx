import ProductImages from 'components/ProductImages';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import weakKey from 'weak-key';
import Dropdown from 'react-dropdown';


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

    const id = Number.parseInt(this.props.routeParams.id);
    const product = this.props.products.filter((prod) => {
      return prod.id === id;
    })[0];

    const productPics = product.images.sort((prod1, prod2) => {
      return prod1 < prod2;
    });

    let displayColor = {
      display: "none"
    };

    console.log(product);
    if (product.colorOptions === true) {
      console.log("OPTIONS HERE");
      displayColor = { display: "inline-block" };
    }

    const options = [1,2,3,4,5,6,7,8,9];

    return <div>
      <div className="product-space">
        <div className="product-main">
          <div className="product-page-container">

            <div className="flex-row-center">

{/* LEFT */}

              <div className="all-prod-images">
                <img
                  id="primaryImg"
                  src={productPics[0].imageUrl}
                  className="product-main-image"
                />
                <div className="flex-row">
                  {productPics.map((prodImg) => {
                    return <ProductImages
                      key={weakKey(prodImg)}
                      productImg={prodImg}
                    />;
                  })}
                </div>
              </div>

{/* RIGTH */}

              <div className="redd">
                <div style={{ marginBottom: "20px"}}>
                  <h1>{product.name}</h1>
                  <h5 >${product.price}</h5>
                </div>

                {/* <div className="Dropdown-container"> */}

                <div className="displayColor" style={displayColor}>
                  <p>Colors</p>
                  <Dropdown options={options} placeholder="Select Color" />
               </div>

                <div className="dropdown-quantity">
                  <p>Quantity</p>
                  <Dropdown options={options} placeholder="1" style={{border: "1px solid black"}} />
                </div>




                <button
                  className="buttonTest"
                  onTouchTap={this.handleTouchTapCart}
                >
                  ADD TO CART
                </button>

                <div className="">
                  <h5>Product Info</h5>
                  <p>{product.description}</p>
                </div>
                <h5>dimensions: {product.dimensions}</h5>
                <div>
                  <img src="/images/Facebook.png" width="35" />
                  <img src="/images/twitter.png" width="35" />
                  <img src="/images/instagram.png" width="35" />
                  <img src="/images/pinterest.png" width="35" />
                  <img src="/images/tumblr.png" width="35"/>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      <div className="footer">
        <div className="bottom-clouds footer">
          <img src="/images/bottom-clouds.png" />
        </div>

        <footer>
          <p>Email - Ohsewmuch@gmail.com</p>

        </footer>
      </div>
    </div>;
  }
});

export default ProductPage;
