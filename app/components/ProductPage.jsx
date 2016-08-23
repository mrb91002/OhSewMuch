import React from 'react';

const ProductPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    console.log('render');
    if (this.props.products.length === 0) {
      return <div></div>;
    }

    const id = Number.parseInt(this.props.routeParams.id);
    const product = this.props.products.filter((prod) => {
      return prod.id === id;
    })[0];
    return <div>

      <img src={product.images[0].imageUrl} />
      <h1>This is the Product Page</h1>
    </div>;
  }
});

export default ProductPage;
