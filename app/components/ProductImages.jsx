import React from 'react';
import { withRouter } from 'react-router';

const ProductImages = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  handleTouchTap() {
    const mainImage = document.getElementById('primaryImg');
    const newMainImage = this.props.productImg.imageUrl;

    mainImage.src = newMainImage;
  },

  render() {
    return <div>
      <img
        alt={this.props.productImg.altText}
        className="thumbnail-img"
        onTouchTap={this.handleTouchTap}
        src={this.props.productImg.imageUrl}
      />
    </div>;
  }
});

export default withRouter(ProductImages);
