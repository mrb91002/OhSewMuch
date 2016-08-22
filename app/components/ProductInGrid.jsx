import React from 'react';

const ProductInGrid = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    const { images } = this.props.product;
    const { product } = this.props;

    return <div className="col s12 m4 l3">
      <div>
        <p>{product.name}</p>
      </div>
      <img src={images[0].imageUrl} className="col s11" alt={images[0].altText} />
    </div>;
  }
});

export default ProductInGrid;
