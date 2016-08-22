import React from 'react';
import ProductInGrid from 'components/ProductInGrid';
import weakKey from 'weak-key';

const HomePage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    let { products } = this.props;

    // Conditionally filtering posts
    // if (params.topic) {
    //   posts = posts.filter((post) => post.topic === this.props.params.topic);
    // }

    const h1Style = {
      color: this.context.muiTheme.palette.primary1Color
    };

    const pStyle = {
      color: this.context.muiTheme.palette.primary2Color
    };


    return <div className="container">
      <h1 style={h1Style}>This is the Home Page</h1>
      <p style={pStyle}>Passed down props: {this.props.test}</p>
      <div className="row">
        {products.map((product) => {
          return <ProductInGrid
            key={weakKey(product)}
            product={product}
          />
        })}
      </div>
    </div>;
  }
});

export default HomePage;
