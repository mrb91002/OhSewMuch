import React from 'react';

const ProductPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    if (this.props.products.length === 0) {
      return <div></div>;
    }

    const id = Number.parseInt(this.props.routeParams.id);
    const product = this.props.products.filter((prod) => {
      return prod.id === id;
    })[0];

    console.log(product);
    return <div className="row product-space container">
      <div className="col s5">
        <img className="col s12"src={product.images[0].imageUrl} />
      </div>

      <div className="col s7">
        <div className="col s10 offset-1 product-info-space">
          <div className="col s12 product-info-inner">
            <h1>{product.name}</h1>
            <h5 className="col s6">${product.price}</h5>
            <p className="col s4 question">Ask a question</p>
            <h5>dimensions: {product.dimensions}</h5>
          </div>
        </div>
      </div>

    </div>;
  }
});

export default ProductPage;
