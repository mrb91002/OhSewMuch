import React from 'react';
import ProductInGrid from 'components/ProductInGrid';

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


    return <div>
      <h1 style={h1Style}>This is the Home Page</h1>
      <p style={pStyle}>Passed down props: {this.props.test}</p>
      {products.map((product) => {
        return <ProductInGrid />
      })}
    </div>;
  }
});

export default HomePage;
