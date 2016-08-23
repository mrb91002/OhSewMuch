import React from 'react';
import { withRouter } from 'react-router';

const ProductInGrid = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  handleTouchTap(event) {
    this.props.router.push(`/product/${this.props.product.id}`)
  },

  render() {
    const { images } = this.props.product;
    const { product } = this.props;

    return <div onTouchTap={this.handleTouchTap} className="col s12 m4 l3 product">
      <img
        alt={images[0].altText}
        className="col s12"
        src={images[0].imageUrl}
      />
        <div className="center-align">{product.name}</div>
        <div className="center-align">${product.price}</div>
    </div>;
  }
});

export default withRouter(ProductInGrid);
