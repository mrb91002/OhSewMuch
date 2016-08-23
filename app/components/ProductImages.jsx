import React from 'react';
import { withRouter } from 'react-router';

const ProductImages = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  handleTouchTap(event) {
    let mainImage = document.getElementById('primaryImg');
    let newMainImage = this.props.productImg.imageUrl;

    mainImage.src = newMainImage;
  },

  render() {

    return <div>
    <img
      className="col s3 thumbnail-img"
      src={this.props.productImg.imageUrl}
      alt={this.props.productImg.altText}
      onTouchTap={this.handleTouchTap}/>
    </div>
  }
});

export default withRouter(ProductImages);
