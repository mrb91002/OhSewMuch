import React from 'react';

const ProductPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    return <div>
      <h1>This is the Product Page</h1>
      <p>Passed down props: {this.props.test2}</p>
    </div>;
  }
});

export default ProductPage;
