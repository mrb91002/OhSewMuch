import React from 'react';
import ProductInGrid from 'components/ProductInGrid';
import weakKey from 'weak-key';

const HomePage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    $('.parallax').parallax();
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
      <div className="parallax-container first-para">
        <div className="parallax">
          <img
            src="http://superheroesofvictoria.org/wp-content/uploads/2014/02/superhero-kids-day.png"
            />
        </div>
      </div>
      <div className="wrap-clouds">
        <img src="./images/cloud6.png" className="shift-clouds" alt="" />
      </div>

      {/* <div className="product-container"> */}
        <div className="container">
          <h1 className="center-align">Products</h1>
          <div className="row">
            {products.map((product) => {
              return <ProductInGrid
                key={weakKey(product)}
                product={product}
              />
            })}
          </div>
        </div>
      {/* </div> */}

      <div className="wrap-clouds2">
        <img src="/images/cloud6.png" className="shift-clouds2" alt=""
         />
      </div>
      <div className="parallax-container city-shift">
         <div className="parallax">
           <img src="/images/lightcity.png" alt="" />
         </div>
     </div>
     <div className=" hill-push">
       <img src="/images/hill2.png" className="hill" alt="" />
     </div>
    </div>;
  }
});

export default HomePage;
