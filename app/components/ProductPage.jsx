import React from 'react';
import ProductImages from 'components/ProductImages';
import weakKey from 'weak-key';
import ReactDOM from 'react-dom';


const ProductPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    console.log('test');
    $(window).scrollTop(0);
  },


  render() {
    if (this.props.products.length === 0) {
      return <div></div>;
    }

    const id = Number.parseInt(this.props.routeParams.id);
    const product = this.props.products.filter((prod) => {
      return prod.id === id;
    })[0];

    const productPics = product.images.sort((prod1, prod2) => {
      return prod1 < prod2;
    });

    console.log(productPics);

    // console.log(product);
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
              <h5 className="col s6">${product.price}</h5>
              <p className="col s4 question">Ask a question</p>
              <h5>dimensions: {product.dimensions}</h5>

              {/* <input type="button" value="-"/>
              <label className="show">{3}</label>
              <input
                type="text"
                className="hide"
                maxLength="4"
                size="4"
                placeholder="{4}"
              />
              <input type="button" value="+"/> */}

            </div>
          </div>
          <div className="col s10 offset-1 social-media">
            <div className="col s12 product-info-inner">
              <img src="./images/Facebook.png" />
              <img src="./images/cloud6.png" className="shift-clouds2" alt=""
               />
            </div>
          </div>
        </div>
        <div className="col s12 description">
          <h1>Item Details</h1>
          {product.description}
        </div>


        {/* This code is not working */}
        <div className="wrap-clouds2">
          <img src="./images/cloud6.png" className="shift-clouds2" alt=""
           />
        </div>
        <div className="parallax-container city-shift">
           <div className="parallax">
             <img src="./images/lightcity.png" alt="" />
           </div>
       </div>
       <div className=" hill-push">
         <img src="./images/hill2.png" className="hill" alt="" />
       </div>
       {/* the above code is not working */}

      </div>
    </div>
  }
});

export default ProductPage;
