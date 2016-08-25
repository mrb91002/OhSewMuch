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
            src="/images/superhero-kids-day.png"
            alt="super-hero kids"
            />
        </div>
      </div>
      {/* <div className="wrap-clouds"> */}
      <div className="s12 wrap-clouds">
        <img src="/images/cloud-production-3.png" className="shift-clouds" alt="fluffy white clouds" />
      </div>
      {/* </div> */}

      {/* <div className="product-container"> */}
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
              />
            })}
          </div>
        </div>
      {/* </div> */}

      {/* <div className="wrap-clouds2">
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
     </div> */}
     <div className="bottom-clouds footer">
      <img src="/images/bottom-clouds.png" />
     </div>

     <footer>
       {/* <p> */}
         Web Design by - Team Super Secret Squirrel
       {/* </p> */}
     </footer>
    </div>;
  }
});

export default HomePage;
