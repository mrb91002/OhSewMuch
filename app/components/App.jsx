import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { withRouter } from 'react-router';

const App = React.createClass({
  getInitialState() {
    return {
      products: [],
      cart: [],
      cookies: {}
    };
  },

  componentWillMount() {
    // Get the products from API
    axios.get('/api/products')
      .then((res) => {
        // Convert string prices to numbers
        const nextProducts = res.data.map((product) => {
          product.price = Number.parseFloat(product.price);

          return product;
        });

        // Get the cart from local storage
        const nextCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Get the cookies from the browser
        const nextCookies = {
          loggedIn: cookie.load('loggedIn'),
          admin: cookie.load('admin')
        };

        this.setState({
          products: nextProducts,
          cart: nextCart,
          cookies: nextCookies
        });
      })
      .catch((err) => {
        console.error(err.response || err);// eslint-disable-line no-console
      });
  },

  handleTitleTouchTap() {
    this.props.router.push('/');
  },

  handleTouchTapLogin() {
    this.props.router.push('/login');
  },

  handleTouchTapReg() {
    this.props.router.push('/register');
  },

  handleTouchTapCart() {
    this.props.router.push('/cart');
  },

  handleTouchTapEmptyCart() {
    this.clearCart();
    this.props.router.push('/');
  },

  handleTouchTapAdmin() {
    this.props.router.push('/adminhome');
  },

  handleTouchTapMenu() {
    var sideNav = document.getElementById('nav-side');

    sideNav.classList.toggle('nav-side-show');
  },

  handleTouchTapLogout() {
    axios.delete('/api/token')
      .then(() => {
        this.updateCookies();
        this.props.router.push('/');
      })
      .catch((err) => {
        console.log(err);// eslint-disable-line no-console
      });
  },

  addToCart(product) {
    let exists = false;
    let nextCart = this.state.cart.map((item) => {
      if (product.id === item.product.id) {
        item.quantity += 1;
        exists = true;
      }

      return item;
    });

    if (!exists) {
      nextCart = nextCart.concat({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(nextCart));
    this.setState({ cart: nextCart });
  },

  removeFromCart(product) {
    const nextCart = this.state.cart.filter((item) => {
      if (item.product.id === product.product.id) {
        return false;
      }

      return true;
    });

    localStorage.setItem('cart', JSON.stringify(nextCart));
    this.setState({ cart: nextCart });
  },

  clearCart() {
    const nextCart = [];

    localStorage.setItem('cart', JSON.stringify(nextCart));

    this.setState({ cart: nextCart });
  },

  updateCookies() {
    const nextCookies = {
      loggedIn: cookie.load('loggedIn'),
      admin: cookie.load('admin')
    };

    this.setState({ cookies: nextCookies });
  },

  updateCart(item, qty) {
    const nextCart = this.state.cart.map((prod) => {
      if (item.product.id === prod.product.id) {
        prod.quantity = qty;
      }

      return prod;
    });

    this.setState({ cart: nextCart });
  },

  getChildrenProps() {
    const matchPath = this.props.routes.reduce((accum, route) => {
      // Sometimes route.path is undefined, so default to empty string
      return `${accum}${route.path || ''}`;
    }, '');

    const props = {
      '/': {
        addToCart: this.addToCart,
        cart: this.state.cart,
        clearCart: this.clearCart,
        cookies: this.state.cookies,
        products: this.state.products,
        removeFromCart: this.removeFromCart,
        updateCart: this.updateCart
      },
      '/register': {
        cookies: this.state.cookies,
        updateCookies: this.updateCookies
      },
      '/payment': {
        cart: this.state.cart,
        cookies: this.state.cookies,
        clearCart: this.clearCart
      }
    };

    props['/login'] = props['/register'];

    props['/product/:id'] = props['/'];
    props['/cart'] = props['/'];
    props['/adminhome'] = props['/'];

    return props[matchPath];
  },

  render() {
    const { loggedIn, admin } = this.state.cookies;
    const { pathname } = this.props.location;
    const { cart } = this.state;

    const quantity = this.state.cart.reduce((accum, item) => {
      return accum + item.quantity;
    }, 0);

    const showRegister = () => {
      if (!loggedIn && pathname !== '/login' || !loggedIn && pathname !== '/register' ) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showLogout = () => {
      if (loggedIn) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showLogin = () => {
      if (!loggedIn && pathname !== '/login' || !loggedIn && pathname !== '/register' ) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showAdmin = () => {
      if (admin) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showCart = () => {
      if (cart.length) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showEmptyCart = () => {
      if (cart.length && pathname === '/cart') {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    return <div>
      <div className="nav">
        <h1 className="title" onTouchTap={this.handleTitleTouchTap}>Oh Sew Much</h1>
        {/* <h1 className="title-short" onTouchTap={this.handleTitleTouchTap}>FPW</h1> */}
        <div>
          <i className="material-icons"
            onTouchTap={this.handleTitleTouchTap}
            style={{fontSize: '30px'}}
            >
              star
          </i>
          <i className="material-icons"
            onTouchTap={this.handleTitleTouchTap}
            style={{fontSize: '40px'}}
            >
              star
          </i>
          <i className="material-icons"
            onTouchTap={this.handleTitleTouchTap}
            style={{fontSize: '30px'}}
            >
              star
          </i>
        </div>


        <div className="nav-right">

          <button
            onTouchTap={this.handleTouchTapLogin}
            style={showLogin()}
          >
            Login
          </button>

          <button
            onTouchTap={this.handleTouchTapReg}
            style={showRegister()}
          >
            Register
          </button>

          <i className="material-icons"
            id="shopping cart"
            onTouchTap={this.handleTouchTapCart}
          >
            shopping_cart
          </i>

          <button
            onTouchTap={this.handleTouchTapProfile}
            style={showLogout()}
          >
            Profile
          </button>

          <button
            onTouchTap={this.handleTouchTapLogout}
            style={showLogout()}
          >
            Logout
          </button>
        {/* </div> */}

      </div>

      <i className="material-icons menu"
        id="menu"
        onTouchTap={this.handleTouchTapMenu}
        >
          menu
      </i>


      <div className="nav-side" id="nav-side">

        <button
          onTouchTap={this.handleTouchTapLogin}
          // style={showLogin()}
        >
          Login
        </button>

        <button
          onTouchTap={this.handleTouchTapReg}
          style={showRegister()}
        >
          Register
        </button>

        <button
          onTouchTap={this.handleTouchTapProfile}
          style={showLogout()}
        >
          Profile
        </button>

        <button
          onTouchTap={this.handleTouchTapLogout}
          style={showLogout()}
        >
          Logout
        </button>

      </div>

    </div>

    <div className="spacer">
      -spacer div-
    </div>

        {/* React.cloneElement is the glue that passes in props to children
          created with React Router. React router instantiates classes for
          us, and cloning the existing instance is the only way to set props.
          */}
        {React.cloneElement(this.props.children, this.getChildrenProps())}
      </div>;

    // return <div>
    //   <AppBar
    //     onTitleTouchTap={this.handleTitleTouchTap}
    //     style={styleNav}
    //     title="Oh Sew Much"
    //     titleStyle={styleTitle}
    //     zDepth={2}
    //   >
    //     <FlatButton
    //       label="Login"
    //       onTouchTap={this.handleTouchTapLogin}
    //       style={Object.assign({}, styleFlatButton, showLogin())}
    //     />
    //     <FlatButton
    //       label="Register"
    //       onTouchTap={this.handleTouchTapReg}
    //       style={Object.assign({}, styleFlatButton, showRegister())}
    //     />
    //     <FlatButton
    //       label="Logout"
    //       onTouchTap={this.handleTouchTapLogout}
    //       style={Object.assign({}, styleFlatButton, showLogout())}
    //     />
    //     <FlatButton
    //       label="Admin"
    //       onTouchTap={this.handleTouchTapAdmin}
    //       style={Object.assign({}, styleFlatButton, showAdmin())}
    //     />
    //     <FlatButton
    //       label={`Cart - ${quantity}`}
    //       onTouchTap={this.handleTouchTapCart}
    //       style={Object.assign({}, styleFlatButton, showCart())}
    //     />
    //     <FlatButton
    //       label="Empty Cart"
    //       onTouchTap={this.handleTouchTapEmptyCart}
    //       style={Object.assign({}, styleFlatButton, showEmptyCart())}
    //     />
    //   </AppBar>
    //
    //   <div style={{ height: '64px' }} />
    //
    //   {/* React.cloneElement is the glue that passes in props to children*/}
    //   {/* created with React Router. React router instantiates classes for us*/}
    //   {/* , and cloning the existing instance is the only way to set props.*/}
    //   {React.cloneElement(this.props.children, this.getChildrenProps())}
    //   {/* {React.cloneElement(this.props.children, {
    //     products: this.state.products
    //   })} */}
    //
    // </div>;
  }
});

export default withRouter(App);
