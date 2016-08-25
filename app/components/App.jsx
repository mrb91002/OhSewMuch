import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import cookie from 'react-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';

const App = React.createClass({
  getInitialState() {
    return {
      products: [],
      cart: [],
      cookies: {}
    }
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
        console.error(err.response || err);
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
    // this.props.router.push('/adminhome');
    console.log('admin');
  },

  handleTouchTapLogout() {
    axios.delete('/api/token')
      .then(() => {
        this.updateCookies();
        this.props.router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  addToCart(product) {
    let exists = false;
    let nextCart = this.state.cart.map((item) => {
      if (product.id === item.product.id ) {
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
    const nextCart = this.state.filter((item) => {
      if (item.product.id === product.id) {
        if (item.quantity === 1) {
          return false;
        }

        item.quantity -= 1;

        return true;
      }
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
        cookies: this.state.cookies
      }
    };

    props['/login'] = props['/register'];
    props['/product/:id'] = props['/'];
    props['/cart'] = props['/'];

    return props[matchPath];
  },

  render() {
    const quantity = this.state.cart.reduce((accum, item) => {
      return accum + item.quantity;
    }, 0);

    const hideWhenLoggedIn = () => {
      if (!this.state.cookies.loggedIn) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showWhenLoggedIn = () => {
      if (this.state.cookies.loggedIn) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showWhenAdmin = () => {
      if (this.state.cookies.admin) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const showWhenCart = () => {
      if (this.state.cart.length) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px',
    };

    const styleTitle = {
      cursor: 'pointer'
    };

    const styleNav = {
      position: 'fixed'
    };

    return <div>
        <AppBar
          onTitleTouchTap={this.handleTitleTouchTap}
          title="Oh Sew Much"
          titleStyle={styleTitle}
          style={styleNav}
          zDepth={2}
        >
          <FlatButton
            label="Login"
            onTouchTap={this.handleTouchTapLogin}
            style={Object.assign({}, styleFlatButton, hideWhenLoggedIn())}
          />
          <FlatButton
            label="Register"
            onTouchTap={this.handleTouchTapReg}
            style={Object.assign({}, styleFlatButton, hideWhenLoggedIn())}
          />
          <FlatButton
            label="Logout"
            onTouchTap={this.handleTouchTapLogout}
            style={Object.assign({}, styleFlatButton, showWhenLoggedIn())}
          />
          <FlatButton
            label="Admin"
            onTouchTap={this.handleTouchTapAdmin}
            style={Object.assign({}, styleFlatButton, showWhenAdmin())}
          />
          <FlatButton
            label={"Cart - " + quantity}
            onTouchTap={this.handleTouchTapCart}
            style={Object.assign({}, styleFlatButton, showWhenCart())}
          />
          <FlatButton
            label="Empty Cart"
            onTouchTap={this.handleTouchTapEmptyCart}
            style={Object.assign({}, styleFlatButton, showWhenCart())}
          />
        </AppBar>
        <div style={{height: '64px'}}>
        </div>
      {/* React.cloneElement is the glue that passes in props to children created with React Router. React router instantiates classes for us, and cloning the existing instance is the only way to set props. */}
      {React.cloneElement(this.props.children, this.getChildrenProps())}
      {/* {React.cloneElement(this.props.children, {
        products: this.state.products
      })} */}
    </div>;
  }
});



export default withRouter(App);
