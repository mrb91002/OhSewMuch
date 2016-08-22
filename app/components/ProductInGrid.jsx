import React from 'react';

const ProductInGrid = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    return <div>
      <h1>Product</h1>
    </div>;
  }
});

export default ProductInGrid;
