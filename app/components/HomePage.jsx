import ProductInGrid from 'components/ProductInGrid';
import React from 'react';
import weakKey from 'weak-key';

const HomePage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    $('.parallax').parallax();
  },

  render() {
    const { products } = this.props;

    return <div>
      <div className="parallax-container first-para">
        <div className="parallax">
          <img
            alt="super-hero kids"
            src="/images/superhero-kids-day.png"
          />
        </div>
      </div>
      <div className="s12 wrap-clouds">
        <img
          alt="fluffy white clouds"
          className="shift-clouds"
          src="/images/cloud-production-3.png"
        />
      </div>
      <div className="container main-content">
        <div className="blur-me">
          <h1 className="center-align">Made with love</h1>
          <h1 className="center-align">For the one you love!</h1>
        </div>
        <div className="row">
          {products.map((product) => {
            return <ProductInGrid
              key={weakKey(product)}
              product={product}
            />;
          })}
        </div>
      </div>
      <div className="bottom-clouds footer">
        <img src="/images/bottom-clouds.png" />
      </div>

      <footer>Web Design by - Team Super Secret Squirrel</footer>
    </div>;
  }
});

export default HomePage;
