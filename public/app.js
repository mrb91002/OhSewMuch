(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;require.register("net", function(exports, require, module) {
  module.exports = {};
});
require.register("dns", function(exports, require, module) {
  module.exports = {};
});
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/AdminHomePage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdminHomePage = _react2.default.createClass({
  displayName: 'AdminHomePage',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      'Admin Home Page'
    );
  }
});

exports.default = AdminHomePage;
});

require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
  displayName: 'App',
  getInitialState: function getInitialState() {
    return {
      products: [],
      cart: [],
      cookies: {}
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    // Get the products from API
    _axios2.default.get('/api/products').then(function (res) {
      // Convert string prices to numbers
      var nextProducts = res.data.map(function (product) {
        product.price = Number.parseFloat(product.price);

        return product;
      });

      // Get the cart from local storage
      var nextCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Get the cookies from the browser
      var nextCookies = {
        loggedIn: _reactCookie2.default.load('loggedIn'),
        admin: _reactCookie2.default.load('admin')
      };

      _this.setState({
        products: nextProducts,
        cart: nextCart,
        cookies: nextCookies
      });
    }).catch(function (err) {
      console.error(err.response || err); // eslint-disable-line no-console
    });
  },
  handleTitleTouchTap: function handleTitleTouchTap() {
    this.props.router.push('/');
  },
  handleTouchTapLogin: function handleTouchTapLogin() {
    this.props.router.push('/login');
  },
  handleTouchTapReg: function handleTouchTapReg() {
    this.props.router.push('/register');
  },
  handleTouchTapCart: function handleTouchTapCart() {
    this.props.router.push('/cart');
  },
  handleTouchTapEmptyCart: function handleTouchTapEmptyCart() {
    this.clearCart();
    this.props.router.push('/');
  },
  handleTouchTapAdmin: function handleTouchTapAdmin() {
    this.props.router.push('/adminhome');
  },
  handleTouchTapLogout: function handleTouchTapLogout() {
    var _this2 = this;

    _axios2.default.delete('/api/token').then(function () {
      _this2.updateCookies();
      _this2.props.router.push('/');
    }).catch(function (err) {
      console.log(err); // eslint-disable-line no-console
    });
  },
  addToCart: function addToCart(product) {
    var exists = false;
    var nextCart = this.state.cart.map(function (item) {
      if (product.id === item.product.id) {
        item.quantity += 1;
        exists = true;
      }

      return item;
    });

    if (!exists) {
      nextCart = nextCart.concat({ product: product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(nextCart));
    this.setState({ cart: nextCart });
  },
  removeFromCart: function removeFromCart(product) {
    var nextCart = this.state.cart.filter(function (item) {
      if (item.product.id === product.product.id) {
        return false;
      }

      return true;
    });

    localStorage.setItem('cart', JSON.stringify(nextCart));
    this.setState({ cart: nextCart });
  },
  clearCart: function clearCart() {
    var nextCart = [];

    localStorage.setItem('cart', JSON.stringify(nextCart));

    this.setState({ cart: nextCart });
  },
  updateCookies: function updateCookies() {
    var nextCookies = {
      loggedIn: _reactCookie2.default.load('loggedIn'),
      admin: _reactCookie2.default.load('admin')
    };

    this.setState({ cookies: nextCookies });
  },
  updateCart: function updateCart(item, qty) {
    var nextCart = this.state.cart.map(function (prod) {
      if (item.product.id === prod.product.id) {
        prod.quantity = qty;
      }

      return prod;
    });

    this.setState({ cart: nextCart });
  },
  getChildrenProps: function getChildrenProps() {
    var matchPath = this.props.routes.reduce(function (accum, route) {
      // Sometimes route.path is undefined, so default to empty string
      return '' + accum + (route.path || '');
    }, '');

    var props = {
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
  render: function render() {
    var _state$cookies = this.state.cookies;
    var loggedIn = _state$cookies.loggedIn;
    var admin = _state$cookies.admin;
    var pathname = this.props.location.pathname;
    var cart = this.state.cart;


    var quantity = this.state.cart.reduce(function (accum, item) {
      return accum + item.quantity;
    }, 0);

    var showRegister = function showRegister() {
      if (!loggedIn && pathname !== '/register') {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    var showLogout = function showLogout() {
      if (loggedIn) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    var showLogin = function showLogin() {
      if (!loggedIn && pathname !== '/login') {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    var showAdmin = function showAdmin() {
      if (admin) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    var showCart = function showCart() {
      if (cart.length) {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    var showEmptyCart = function showEmptyCart() {
      if (cart.length && pathname === '/cart') {
        return { display: 'block' };
      }

      return { display: 'none' };
    };

    var styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    };

    var styleTitle = {
      cursor: 'pointer'
    };

    var styleNav = {
      position: 'fixed'
    };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _AppBar2.default,
        {
          onTitleTouchTap: this.handleTitleTouchTap,
          style: styleNav,
          title: 'Oh Sew Much',
          titleStyle: styleTitle,
          zDepth: 2
        },
        _react2.default.createElement(_FlatButton2.default, {
          label: 'Login',
          onTouchTap: this.handleTouchTapLogin,
          style: Object.assign({}, styleFlatButton, showLogin())
        }),
        _react2.default.createElement(_FlatButton2.default, {
          label: 'Register',
          onTouchTap: this.handleTouchTapReg,
          style: Object.assign({}, styleFlatButton, showRegister())
        }),
        _react2.default.createElement(_FlatButton2.default, {
          label: 'Logout',
          onTouchTap: this.handleTouchTapLogout,
          style: Object.assign({}, styleFlatButton, showLogout())
        }),
        _react2.default.createElement(_FlatButton2.default, {
          label: 'Admin',
          onTouchTap: this.handleTouchTapAdmin,
          style: Object.assign({}, styleFlatButton, showAdmin())
        }),
        _react2.default.createElement(_FlatButton2.default, {
          label: 'Cart - ' + quantity,
          onTouchTap: this.handleTouchTapCart,
          style: Object.assign({}, styleFlatButton, showCart())
        }),
        _react2.default.createElement(_FlatButton2.default, {
          label: 'Empty Cart',
          onTouchTap: this.handleTouchTapEmptyCart,
          style: Object.assign({}, styleFlatButton, showEmptyCart())
        })
      ),
      _react2.default.createElement('div', { style: { height: '64px' } }),
      _react2.default.cloneElement(this.props.children, this.getChildrenProps())
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(App);
});

require.register("components/BillAddress.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BillAddress = _react2.default.createClass({
  displayName: 'BillAddress',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  handleBlur: function handleBlur(event) {
    this.props.processBlur(event);
  },
  handleChange: function handleChange(event) {
    this.props.processChange(event);
  },
  render: function render() {
    var _props = this.props;
    var errors = _props.errors;
    var address = _props.address;

    var styleTextField = {
      display: 'block'
    };

    var styleError = {
      marginTop: '-20px'
    };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.firstName,
            floatingLabelText: '* First Name',
            fullWidth: true,
            hintText: 'First name...',
            name: 'firstName',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.firstName
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.lastName,
            floatingLabelText: '* Last Name',
            fullWidth: true,
            hintText: 'Last name...',
            name: 'lastName',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.lastName
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.email,
            floatingLabelText: '* Email',
            fullWidth: true,
            hintText: 'Email address...',
            name: 'email',
            noValidate: true,
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.email
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.phone,
            floatingLabelText: 'Phone',
            fullWidth: true,
            hintText: 'Phone number...',
            name: 'phone',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            type: 'tel',
            value: address.phone
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.addressLine1,
            floatingLabelText: '* Street Address',
            fullWidth: true,
            hintText: 'Address Line 1...',
            name: 'addressLine1',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.addressLine1
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.addressLine2,
            floatingLabelText: 'Apt / Suite / Other',
            fullWidth: true,
            hintText: 'Address Line 2...',
            name: 'addressLine2',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.addressLine2
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.addressCity,
            floatingLabelText: '* City',
            fullWidth: true,
            hintText: 'City name...',
            name: 'addressCity',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.addressCity
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.addressState,
            floatingLabelText: '* State',
            fullWidth: true,
            hintText: 'State abrv...',
            name: 'addressState',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.addressState
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.addressZip,
            floatingLabelText: '* Zip Code',
            fullWidth: true,
            hintText: '5-digit zip code...',
            name: 'addressZip',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.addressZip
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            disabled: true,
            errorStyle: styleError,
            errorText: errors.addressCountry,
            floatingLabelText: '* Country',
            fullWidth: true,
            hintText: 'Country abrv...',
            name: 'addressCountry',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.addressCountry
          })
        )
      )
    );
  }
});

exports.default = BillAddress;
});

require.register("components/CartItem.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartItem = _react2.default.createClass({
  displayName: 'CartItem',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      quantity: this.props.item.quantity
    };
  },
  handleTouchTap: function handleTouchTap() {
    this.props.router.push('/product/' + this.props.item.product.id);
  },
  handleDoubleClick: function handleDoubleClick() {
    this.props.updateCart(this.props.item);
  },
  handleChange: function handleChange(event) {
    var nextQuantity = event.target.value;

    if (nextQuantity === '') {
      return this.setState({ quantity: '' });
    }

    if (isNaN(nextQuantity) || nextQuantity <= 0 || nextQuantity >= 100) {
      return;
    }

    nextQuantity = Number.parseInt(nextQuantity);

    this.setState({ quantity: nextQuantity });
  },
  handleDelete: function handleDelete() {
    this.props.removeFromCart(this.props.item);
  },
  handleEnter: function handleEnter(event) {
    if (this.state.quantity === '') {
      return;
    }

    if (event.which !== 13) {
      return;
    }

    this.props.updateCart(this.props.item, this.state.quantity);
  },
  handleBlur: function handleBlur() {
    if (this.state.quantity === '') {
      return;
    }

    this.props.updateCart(this.props.item, this.state.quantity);
  },
  render: function render() {
    var item = this.props.item;

    var number = {
      cursor: 'pointer',
      borderRadius: '3px',
      width: '35px',
      height: '35px',
      margin: '0 auto',
      textAlign: 'center',
      backgroundColor: '#EFEFF4',
      marginTop: '10px',
      paddingTop: '5px'
    };

    return _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'Cart-Product' },
        _react2.default.createElement(
          'div',
          { className: 'col s6 l4' },
          _react2.default.createElement('img', {
            onTouchTap: this.handleTouchTap,
            src: item.product.images[0].imageUrl,
            style: { cursor: 'pointer', paddingLeft: '40px' },
            width: '70%'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s6 l4 fill' },
          _react2.default.createElement(
            'p',
            null,
            item.product.name
          ),
          _react2.default.createElement(
            'p',
            null,
            'measurements: ',
            item.product.dimensions,
            ' '
          ),
          _react2.default.createElement(
            'p',
            {
              onTouchTap: this.handleDelete,
              style: { color: 'red', cursor: 'pointer' }
            },
            'Delete'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s6 l2 ' },
          _react2.default.createElement('input', {
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            onKeyUp: this.handleEnter,
            style: number,
            value: this.state.quantity
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s16 l2 ' },
          _react2.default.createElement(
            'p',
            null,
            '$',
            '' + (item.product.price * item.quantity).toFixed(2)
          )
        )
      )
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(CartItem);
});

require.register("components/CartPage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CartItem = require('components/CartItem');

var _CartItem2 = _interopRequireDefault(_CartItem);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _weakKey = require('weak-key');

var _weakKey2 = _interopRequireDefault(_weakKey);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartPage = _react2.default.createClass({
  displayName: 'CartPage',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  handleTouchTapCheckout: function handleTouchTapCheckout() {
    this.props.router.push('/payment');
  },
  render: function render() {
    var _this = this;

    var cart = this.props.cart;

    var quantity = cart.reduce(function (accum, item) {
      return accum + item.quantity;
    }, 0);

    var subTotal = cart.reduce(function (accum, item) {
      return accum + item.quantity * item.product.price;
    }, 0);

    var styleButton = {};

    var lock = {
      position: 'fixed',
      width: '20%',
      top: '140px',
      left: '65%'
    };

    var stylePaper = {
      borderRadius: '5px',
      minHeight: '500px'
    };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'h5',
            null,
            quantity,
            ' Items In Your Cart '
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _Paper2.default,
            {
              className: 'col s12',
              rounded: false,
              style: stylePaper,
              zDepth: 3
            },
            _react2.default.createElement(
              'div',
              { className: 'cart-group row' },
              _react2.default.createElement(
                'div',
                { className: 'col s8 border-right' },
                _react2.default.createElement(
                  'div',
                  { className: 'section' },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'div',
                      { className: 'col s4 align-center offset-s4' },
                      'Product Name'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col s2 align-center' },
                      'Qty'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col s2 align-center' },
                      'Price'
                    )
                  ),
                  _react2.default.createElement('div', {
                    className: 'divider',
                    style: {
                      backgroundColor: 'rgb(149, 39, 39)',
                      border: '0px'
                    }
                  })
                ),
                cart.map(function (item) {
                  return _react2.default.createElement(_CartItem2.default, {
                    item: item,
                    key: (0, _weakKey2.default)(item),
                    removeFromCart: _this.props.removeFromCart,
                    updateCart: _this.props.updateCart
                  });
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col s4', style: lock },
                _react2.default.createElement(
                  'div',
                  { className: 'flt' },
                  _react2.default.createElement(
                    'table',
                    null,
                    _react2.default.createElement(
                      'tbody',
                      null,
                      _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                          'td',
                          null,
                          'Subtotal'
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          '$',
                          subTotal.toFixed(2)
                        )
                      ),
                      _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                          'td',
                          null,
                          'tax'
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          'WA Only'
                        )
                      ),
                      _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                          'td',
                          null,
                          'Shipping'
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          'FREE'
                        )
                      ),
                      _react2.default.createElement(
                        'tr',
                        { className: 'border-top' },
                        _react2.default.createElement(
                          'td',
                          null,
                          'Total'
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          '$',
                          subTotal.toFixed(2)
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(_RaisedButton2.default, {
                  backgroundColor: 'rgba(149, 39, 39, 0.9)',
                  label: 'Proceed To Checkout',
                  labelColor: '#fff',
                  onTouchTap: this.handleTouchTapCheckout,
                  style: styleButton
                }),
                _react2.default.createElement(
                  'p',
                  null,
                  'Additional Duties and Taxes May Apply'
                )
              )
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'bottom-clouds footer' },
        _react2.default.createElement('img', { src: '/images/bottom-clouds.png' })
      ),
      _react2.default.createElement(
        'footer',
        null,
        'Web Design by - Team Super Secret Squirrel'
      )
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(CartPage);
});

require.register("components/HomePage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProductInGrid = require('components/ProductInGrid');

var _ProductInGrid2 = _interopRequireDefault(_ProductInGrid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _weakKey = require('weak-key');

var _weakKey2 = _interopRequireDefault(_weakKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomePage = _react2.default.createClass({
  displayName: 'HomePage',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  componentDidMount: function componentDidMount() {
    $('.parallax').parallax();
  },
  render: function render() {
    var products = this.props.products;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'parallax-container first-para' },
        _react2.default.createElement(
          'div',
          { className: 'parallax' },
          _react2.default.createElement('img', {
            alt: 'super-hero kids',
            src: '/images/superhero-kids-day.png'
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 's12 wrap-clouds' },
        _react2.default.createElement('img', {
          alt: 'fluffy white clouds',
          className: 'shift-clouds',
          src: '/images/cloud-production-3.png'
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'container main-content' },
        _react2.default.createElement(
          'div',
          { className: 'blur-me' },
          _react2.default.createElement(
            'h1',
            { className: 'center-align' },
            'Made with love'
          ),
          _react2.default.createElement(
            'h1',
            { className: 'center-align' },
            'For the one you love!'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          products.map(function (product) {
            return _react2.default.createElement(_ProductInGrid2.default, {
              key: (0, _weakKey2.default)(product),
              product: product
            });
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'bottom-clouds footer' },
        _react2.default.createElement('img', { src: '/images/bottom-clouds.png' })
      ),
      _react2.default.createElement(
        'footer',
        null,
        'Web Design by - Team Super Secret Squirrel'
      )
    );
  }
});

exports.default = HomePage;
});

require.register("components/LoginPage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cancel = require('material-ui/svg-icons/navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _send = require('material-ui/svg-icons/content/send');

var _send2 = _interopRequireDefault(_send);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var schema = _joi2.default.object({
  userName: _joi2.default.string().trim().max(255),
  password: _joi2.default.string().trim().max(255)
});

var LoginPage = _react2.default.createClass({
  displayName: 'LoginPage',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      errors: {},
      login: {
        userName: '',
        password: ''
      },
      loginFailText: '',
      open: false
    };
  },
  handleChange: function handleChange(event) {
    var _event$target = event.target;
    var name = _event$target.name;
    var value = _event$target.value;

    var nextLogin = Object.assign({}, this.state.login, _defineProperty({}, name, value));

    this.setState({ login: nextLogin });
  },
  handleTouchTapCancel: function handleTouchTapCancel() {
    this.props.router.goBack();
  },
  handleTouchTapLogin: function handleTouchTapLogin() {
    var _this = this;

    var result = _joi2.default.validate(this.state.login, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      var nextErrors = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = result.error.details[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var detail = _step.value;

          nextErrors[detail.path] = detail.message;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.setState({ errors: nextErrors });
    }

    _axios2.default.post('/api/token', this.state.login).then(function () {
      _this.props.updateCookies();
      _this.props.router.push('/');
    }).catch(function (err) {
      _this.setState({
        open: true,
        loginFailText: err.response.data
      });
    });
  },
  handleRequestClose: function handleRequestClose() {
    this.setState({
      open: false,
      loginFailText: ''
    });
  },
  handleBlur: function handleBlur(event) {
    var _event$target2 = event.target;
    var name = _event$target2.name;
    var value = _event$target2.value;

    var nextErrors = Object.assign({}, this.state.errors);
    var result = _joi2.default.validate(_defineProperty({}, name, value), schema);

    if (result.error) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = result.error.details[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var detail = _step2.value;

          nextErrors[detail.path] = detail.message;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } else {
      delete nextErrors[name];
    }

    this.setState({ errors: nextErrors });
  },
  handleKeyUp: function handleKeyUp(event) {
    if (event.which === 13) {
      this.handleTouchTapLogin();
    }
  },
  render: function render() {
    var _state = this.state;
    var errors = _state.errors;
    var login = _state.login;

    // Necessary to make change event work after blur event.
    // Can't be done through CSS.

    var styleTextField = {
      display: 'block'
    };

    return _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'row login-form' },
        _react2.default.createElement(
          _Paper2.default,
          {
            className: 'col s12 m8 offset-m2 center-align',
            onKeyUp: this.handleKeyUp,
            rounded: false,
            zDepth: 3
          },
          _react2.default.createElement(
            'h1',
            null,
            'Login'
          ),
          _react2.default.createElement(_TextField2.default, {
            errorText: errors.userName,
            floatingLabelText: 'User Name',
            fullWidth: true,
            hintText: 'Enter your user name...',
            name: 'userName',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: login.userName
          }),
          _react2.default.createElement(_TextField2.default, {
            errorText: errors.password,
            floatingLabelText: 'Password',
            fullWidth: true,
            hintText: 'Enter your password...',
            name: 'password',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            type: 'password',
            value: login.password
          }),
          _react2.default.createElement(
            'div',
            { className: 'row form-button-row' },
            _react2.default.createElement(_RaisedButton2.default, {
              className: 'col s4 offset-s1 l3 offset-l2 form-button',
              icon: _react2.default.createElement(_send2.default, null),
              label: 'Login',
              labelPosition: 'before',
              onTouchTap: this.handleTouchTapLogin,
              primary: true
            }),
            _react2.default.createElement(_RaisedButton2.default, {
              className: 'col s4 offset-s2 l3 offset-l2 form-button',
              icon: _react2.default.createElement(_cancel2.default, null),
              label: 'Cancel',
              labelPosition: 'before',
              onTouchTap: this.handleTouchTapCancel,
              primary: true
            })
          )
        )
      ),
      _react2.default.createElement(_Snackbar2.default, {
        autoHideDuration: 3000,
        message: this.state.loginFailText,
        onRequestClose: this.handleRequestClose,
        open: this.state.open
      })
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(LoginPage);
});

require.register("components/NotFound.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = _react2.default.createClass({
  displayName: "NotFound",
  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "container" },
      _react2.default.createElement(
        "div",
        { className: "center" },
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "h1",
          null,
          "404 Not Found"
        ),
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "h3",
          null,
          "The page you requested is not available in our system."
        )
      )
    );
  }
});

exports.default = NotFound;
});

require.register("components/OrderHistoryPage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OrderSummary = require('components/OrderSummary');

var _OrderSummary2 = _interopRequireDefault(_OrderSummary);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _weakKey = require('weak-key');

var _weakKey2 = _interopRequireDefault(_weakKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderHistoryPage = _react2.default.createClass({
  displayName: 'OrderHistoryPage',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      orders: []
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    // Get the orders from API
    _axios2.default.get('/api/orders').then(function (res) {
      _this.setState({ orders: res.data });
    }).catch(function (err) {
      console.error(err.response); // eslint-disable-line no-console
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.state.orders.map(function (ord) {
        return _react2.default.createElement(_OrderSummary2.default, {
          cart: ord,
          key: (0, _weakKey2.default)(ord)
        });
      }),
      _react2.default.createElement(
        'p',
        null,
        'this'
      )
    );
  }
});

exports.default = OrderHistoryPage;
});

require.register("components/OrderSummary.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Table = require('material-ui/Table');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _weakKey = require('weak-key');

var _weakKey2 = _interopRequireDefault(_weakKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taxRate = 0;

var OrderSummary = _react2.default.createClass({
  displayName: 'OrderSummary',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  subtotal: function subtotal() {
    return this.props.cart.reduce(function (accum, item) {
      return accum + item.quantity * item.product.price;
    }, 0);
  },
  tax: function tax() {
    return this.subtotal() * taxRate;
  },
  total: function total() {
    return this.subtotal() + this.tax();
  },
  render: function render() {
    var palette = this.context.muiTheme.palette;

    var styleHeader = {
      color: palette.accent1Color,
      marginBottom: '0px'
    };

    var styleSubHeader = {
      color: palette.textColor,
      marginTop: '5px',
      marginBottom: 0
    };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'pay-headers' },
        _react2.default.createElement(
          'h1',
          {
            className: 'flow-text',
            style: styleHeader
          },
          'ORDER SUMMARY: Processed Securely with Square'
        ),
        _react2.default.createElement(
          'p',
          {
            style: styleSubHeader
          },
          'Please review the following details for this transaction.'
        )
      ),
      _react2.default.createElement(
        _Table.Table,
        { style: { tableLayout: 'auto' } },
        _react2.default.createElement(
          _Table.TableHeader,
          { adjustForCheckbox: false, displaySelectAll: false },
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(
              _Table.TableHeaderColumn,
              { style: { width: '50%' } },
              'Product'
            ),
            _react2.default.createElement(
              _Table.TableHeaderColumn,
              { style: { width: '12.5%' } },
              'Qty'
            ),
            _react2.default.createElement(
              _Table.TableHeaderColumn,
              { style: { width: '18.75%' } },
              'Price'
            ),
            _react2.default.createElement(
              _Table.TableHeaderColumn,
              { style: { width: '18.75%' } },
              'Subtotal'
            )
          )
        ),
        _react2.default.createElement(
          _Table.TableBody,
          { displayRowCheckbox: false, showRowHover: true },
          this.props.cart.map(function (item) {
            return _react2.default.createElement(
              _Table.TableRow,
              { key: (0, _weakKey2.default)(item) },
              _react2.default.createElement(
                _Table.TableRowColumn,
                { style: { width: '50%' } },
                item.product.name
              ),
              _react2.default.createElement(
                _Table.TableRowColumn,
                { style: { width: '12.5%' } },
                item.quantity
              ),
              _react2.default.createElement(
                _Table.TableRowColumn,
                { style: { width: '18.75%' } },
                item.product.price.toFixed(2)
              ),
              _react2.default.createElement(
                _Table.TableRowColumn,
                { style: { width: '18.75%' } },
                (item.product.price * item.quantity).toFixed(2)
              )
            );
          }),
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(_Table.TableRowColumn, null),
            _react2.default.createElement(_Table.TableRowColumn, null),
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              ' ',
              'Subtotal:'
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              '$',
              this.subtotal().toFixed(2)
            )
          ),
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(_Table.TableRowColumn, null),
            _react2.default.createElement(_Table.TableRowColumn, null),
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              ' ',
              'Tax:'
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              '$',
              this.tax().toFixed(2)
            )
          ),
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(_Table.TableRowColumn, null),
            _react2.default.createElement(_Table.TableRowColumn, null),
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              ' ',
              'Total:'
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              '$',
              this.total().toFixed(2)
            )
          )
        )
      )
    );
  }
});

exports.default = OrderSummary;
});

require.register("components/PaymentPage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BillAddress = require('components/BillAddress');

var _BillAddress2 = _interopRequireDefault(_BillAddress);

var _cancel = require('material-ui/svg-icons/navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _OrderSummary = require('components/OrderSummary');

var _OrderSummary2 = _interopRequireDefault(_OrderSummary);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _send = require('material-ui/svg-icons/content/send');

var _send2 = _interopRequireDefault(_send);

var _ShipAddress = require('components/ShipAddress');

var _ShipAddress2 = _interopRequireDefault(_ShipAddress);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _SquareForm = require('components/SquareForm');

var _SquareForm2 = _interopRequireDefault(_SquareForm);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _humps = require('humps');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint-disable max-lines */


var state = void 0;
var props = void 0;

var schema = _joi2.default.object({
  firstName: _joi2.default.string().trim().max(255),
  lastName: _joi2.default.string().trim().max(255),
  email: _joi2.default.string().email().trim().min(6),
  phone: _joi2.default.string().allow('').trim().min(7).max(20).optional(),
  addressLine1: _joi2.default.string().trim().max(255),
  addressLine2: _joi2.default.string().allow('').trim().max(255).optional(),
  addressCity: _joi2.default.string().trim().max(255),
  addressState: _joi2.default.string().trim().length(2),
  addressZip: _joi2.default.string().trim().min(5).max(10),
  addressCountry: _joi2.default.string().trim().length(2),
  shipFirstName: _joi2.default.string().trim().max(255),
  shipLastName: _joi2.default.string().trim().max(255),
  shipAddressLine1: _joi2.default.string().trim().max(255),
  shipAddressLine2: _joi2.default.string().allow('').trim().max(255).optional(),
  shipAddressCity: _joi2.default.string().trim().max(255),
  shipAddressState: _joi2.default.string().trim().length(2),
  shipAddressZip: _joi2.default.string().trim().min(5).max(10),
  shipAddressCountry: _joi2.default.string().trim().length(2)
});

var PaymentPage = _react2.default.createClass({
  displayName: 'PaymentPage',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      errors: {},
      open: false,
      payFailText: '',
      paymentForm: {},
      address: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        addressCountry: 'US',
        shipFirstName: '',
        shipLastName: '',
        shipAddressLine1: '',
        shipAddressLine2: '',
        shipAddressCity: '',
        shipAddressState: '',
        shipAddressZip: '',
        shipAddressCountry: 'US'
      },
      shipping: false
    };
  },
  componentWillMount: function componentWillMount() {
    if (!Object.keys(this.props.cookies).length) {
      return;
    }

    props = this.props;
    this.getCustomerInfo(this.props);
  },
  componentDidMount: function componentDidMount() {
    // Sandbox AppID
    var applicationId = 'sandbox-sq0idp-JQWJQ16-z103Dcor0PDo4Q';

    // The payment form
    // eslint-disable-next-line no-undef
    var paymentForm = new SqPaymentForm({
      applicationId: applicationId,
      inputClass: 'sq-input',
      inputStyles: [{
        fontSize: '15px'
      }],
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '•••• •••• •••• ••••'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code'
      },
      callbacks: {

        // Called when the SqPaymentForm completes a request to generate a card
        // nonce, even if the request failed because of an error.
        // Params available below: (errors, nonce, cardData)
        cardNonceResponseReceived: function cardNonceResponseReceived(errors, nonce) {
          if (errors) {
            // eslint-disable-next-line no-console
            console.log('Encountered errors:');

            // This logs all errors encountered during nonce generation to the
            // Javascript console.
            errors.forEach(function (error) {
              // eslint-disable-next-line no-console
              console.log('  ' + error.message);
            });

            // No errors occurred. Extract the card nonce or cardData
          } else {
            (function () {
              var products = [];

              // Hard coded ship-type and Promo skipped
              var shipType = 'UPS: Standard';
              var order = {};
              var newCustomer = void 0;
              var total = props.cart.reduce(function (accum, item) {
                return accum + item.quantity * item.product.price;
              }, 0);

              _axios2.default.post('/api/payment', {
                nonce: nonce,
                amount: total
              }).then(function () {
                // Need to store apiRes for credit authorization at some point.
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = props.cart[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    for (var i = 0; i < item.quantity; i++) {
                      products.push(item.product.id);
                    }
                  }

                  // Need promo and shiptype processed here

                  // Loop address and remove blank fields
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }

                var cust = Object.assign({}, state.address);

                for (var key in cust) {
                  if (!cust[key]) {
                    delete cust[key];
                  }
                }

                // Need to get a customer or patch existing
                if (!props.cookies.loggedIn) {
                  return _axios2.default.post('api/customers', cust);
                }

                // Should only patch if necessary, but patching all is a shortcut
                // to get this done quicker.
                return _axios2.default.patch('api/customer', cust);
              }).then(function (customer) {
                newCustomer = (0, _humps.camelizeKeys)(customer.data);
                if (!props.cookies.loggedIn) {
                  order.customerId = newCustomer.id;
                }

                // Would also add promoId at this point
                order.shipType = shipType;
                order.products = products;

                return _axios2.default.post('api/orders', order);
              }).then(function () {
                // Need to store newOrder to state of App.
                // Need to navigate to thank you page.
                props.clearCart();
                props.router.push('/thankyou');
              }).catch(function (err) {
                // need to handle address errors in toast or equiv.
                // eslint-disable-next-line no-console
                console.log(err.response || err);
              });
            })();
          }
        },
        unsupportedBrowserDetected: function unsupportedBrowserDetected() {
          // Fill in this callback to alert buyers
          // when their browser is not supported.
        },


        // Fill in these cases to respond to various events that
        // can occur while a buyer is using the payment form.
        inputEventReceived: function inputEventReceived(inputEvent) {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              // Handle as desired
              break;
            case 'focusClassRemoved':
              // Handle as desired
              break;
            case 'errorClassAdded':
              // Handle as desired
              break;
            case 'errorClassRemoved':
              // Handle as desired
              break;
            case 'cardBrandChanged':
              // Handle as desired
              break;
            case 'postalCodeChanged':
              // Handle as desired
              break;
            default:
              break;
          }
        }
      }
    });

    // Necessary to initialize payment form on dynamic insertion
    paymentForm.build();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ paymentForm: paymentForm });
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    props = nextProps;
    this.getCustomerInfo(nextProps);
  },
  componentWillUnmount: function componentWillUnmount() {
    // Necessary to prevent memory leaks and unwanted event handlers
    this.state.paymentForm.destroy();
  },
  getCustomerInfo: function getCustomerInfo(properties) {
    var _this = this;

    if (properties.cookies.loggedIn) {
      _axios2.default.get('api/customer').then(function (apiRes) {
        var customer = apiRes.data;
        var nextAddress = {};

        delete customer.id;
        delete customer.userName;

        for (var key in customer) {
          if (customer[key]) {
            nextAddress[key] = customer[key];
          } else {
            nextAddress[key] = '';
          }
        }
        _this.setState({ address: nextAddress });
      }).catch(function (err) {
        console.log(err.response); // eslint-disable-line no-console
      });
    }
  },
  handleRequestClose: function handleRequestClose() {
    this.setState({
      open: false,
      payFailText: ''
    });
  },
  handleBlur: function handleBlur(event) {
    this.processBlur(event);
  },
  handleChange: function handleChange(event) {
    this.processChange(event);
  },
  handleTouchTapSubmit: function handleTouchTapSubmit() {
    state = this.state;
    props = this.props;
    this.state.paymentForm.requestCardNonce();
  },
  handleTouchTapCancel: function handleTouchTapCancel() {
    this.props.router.push('/');
  },
  handleCheck: function handleCheck(event, isChecked) {
    this.setState({ shipping: isChecked });
  },
  displayShipping: function displayShipping() {
    if (this.state.shipping) {
      return { display: 'block' };
    }

    return { display: 'none' };
  },
  processBlur: function processBlur(event) {
    var _event$target = event.target;
    var name = _event$target.name;
    var value = _event$target.value;

    var nextErrors = Object.assign({}, this.state.errors);
    var result = _joi2.default.validate(_defineProperty({}, name, value), schema);

    if (result.error) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = result.error.details[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var detail = _step2.value;

          nextErrors[detail.path] = detail.message;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } else {
      delete nextErrors[name];
    }

    this.setState({ errors: nextErrors });
  },
  processChange: function processChange(event) {
    var address = this.state.address;
    var name = event.target.name;
    var value = event.target.value;


    if (name === 'addressState' || name === 'addressCountry' || name === 'shipAddressState' || name === 'shipAddressCountry') {
      value = value.toUpperCase();
    }

    if (value.length === 1) {
      if (name === 'addressCity' || name === 'shipAddressCity') {
        value = value.toUpperCase();
      }

      if (name === 'firstName' || name === 'lastName') {
        value = value.toUpperCase();
      }

      if (name === 'shipFirstName' || name === 'shipLastName') {
        value = value.toUpperCase();
      }
    }

    var nextAddress = Object.assign({}, address, _defineProperty({}, name, value));

    this.setState({ address: nextAddress });
  },
  render: function render() {
    // Necessary to make change event work after blur event.
    // Can't be done through CSS.
    var stylePaper = {
      borderRadius: '5px'
    };

    return _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'row payment-form' },
        _react2.default.createElement(
          _Paper2.default,
          {
            className: 'col s12',
            rounded: false,
            style: stylePaper,
            zDepth: 3
          },
          _react2.default.createElement(_OrderSummary2.default, { cart: this.props.cart }),
          _react2.default.createElement('div', { className: 'divider section' }),
          _react2.default.createElement(
            'div',
            { className: 'row form-row' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 m7 l6' },
              _react2.default.createElement(
                'h6',
                null,
                'Billing Address'
              ),
              _react2.default.createElement(_BillAddress2.default, {
                address: this.state.address,
                errors: this.state.errors,
                processBlur: this.processBlur,
                processChange: this.processChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s12 m5 l6 section' },
              _react2.default.createElement(
                'h6',
                null,
                'Credit Card Details'
              ),
              _react2.default.createElement(_SquareForm2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s12' },
              _react2.default.createElement(_Checkbox2.default, {
                label: 'Different shipping address',
                onCheck: this.handleCheck,
                value: this.state.shipping
              }),
              _react2.default.createElement(
                'div',
                { className: 'row', style: this.displayShipping() },
                _react2.default.createElement(
                  'div',
                  { className: 'col s12 m7 l6' },
                  _react2.default.createElement(
                    'h6',
                    null,
                    'Shipping Address'
                  ),
                  _react2.default.createElement(_ShipAddress2.default, {
                    address: this.state.address,
                    errors: this.state.errors,
                    processBlur: this.processBlur,
                    processChange: this.processChange
                  })
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row form-button-row' },
            _react2.default.createElement(_RaisedButton2.default, {
              className: 'col s4 offset-s1 l3 offset-l2 form-button',
              icon: _react2.default.createElement(_send2.default, null),
              label: 'Submit',
              labelPosition: 'before',
              onTouchTap: this.handleTouchTapSubmit,
              primary: true
            }),
            _react2.default.createElement(_RaisedButton2.default, {
              className: 'col s4 offset-s2 l3 offset-l2 form-button',
              icon: _react2.default.createElement(_cancel2.default, null),
              label: 'Cancel',
              labelPosition: 'before',
              onTouchTap: this.handleTouchTapCancel,
              primary: true
            })
          )
        )
      ),
      _react2.default.createElement(_Snackbar2.default, {
        autoHideDuration: 3000,
        message: this.state.payFailText,
        onRequestClose: this.handleRequestClose,
        open: this.state.open
      })
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(PaymentPage);
});

require.register("components/ProductImages.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductImages = _react2.default.createClass({
  displayName: 'ProductImages',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  handleTouchTap: function handleTouchTap() {
    var mainImage = document.getElementById('primaryImg');
    var newMainImage = this.props.productImg.imageUrl;

    mainImage.src = newMainImage;
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('img', {
        alt: this.props.productImg.altText,
        className: 'col s3 thumbnail-img',
        onTouchTap: this.handleTouchTap,
        src: this.props.productImg.imageUrl
      })
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(ProductImages);
});

require.register("components/ProductInGrid.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductInGrid = _react2.default.createClass({
  displayName: 'ProductInGrid',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  handleTouchTap: function handleTouchTap() {
    this.props.router.push('/product/' + this.props.product.id);
  },
  render: function render() {
    var images = this.props.product.images;
    var product = this.props.product;


    return _react2.default.createElement(
      'div',
      {
        className: 'col s12 m4 l3 product',
        onTouchTap: this.handleTouchTap
      },
      _react2.default.createElement('img', {
        alt: images[0].altText,
        className: 'col s12',
        src: images[0].imageUrl
      }),
      _react2.default.createElement(
        'div',
        { className: 'center-align' },
        product.name
      ),
      _react2.default.createElement(
        'div',
        { className: 'center-align' },
        '$',
        product.price
      )
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(ProductInGrid);
});

require.register("components/ProductPage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProductImages = require('components/ProductImages');

var _ProductImages2 = _interopRequireDefault(_ProductImages);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _weakKey = require('weak-key');

var _weakKey2 = _interopRequireDefault(_weakKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductPage = _react2.default.createClass({
  displayName: 'ProductPage',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  componentDidMount: function componentDidMount() {
    $(window).scrollTop(0);
  },
  handleTouchTapCart: function handleTouchTapCart() {
    var id = Number.parseInt(this.props.params.id);
    var products = this.props.products;

    var product = products.filter(function (prod) {
      return prod.id === id;
    })[0];

    Materialize.toast('Item Added To Cart', 2000, 'rounded');
    this.props.addToCart(product);
  },
  render: function render() {
    if (this.props.products.length === 0) {
      return _react2.default.createElement('div', null);
    }

    var styleButton = {
      margin: '50px'
    };

    var id = Number.parseInt(this.props.routeParams.id);
    var product = this.props.products.filter(function (prod) {
      return prod.id === id;
    })[0];

    var productPics = product.images.sort(function (prod1, prod2) {
      return prod1 < prod2;
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'row product-space container' },
        _react2.default.createElement(
          'div',
          { className: 'col s5' },
          _react2.default.createElement('img', {
            className: 'col s12',
            id: 'primaryImg',
            src: productPics[0].imageUrl
          }),
          productPics.map(function (prodImg) {
            return _react2.default.createElement(_ProductImages2.default, {
              key: (0, _weakKey2.default)(prodImg),
              productImg: prodImg
            });
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s7' },
          _react2.default.createElement(
            'div',
            { className: 'col s10 offset-1 product-info-space' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 product-info-inner' },
              _react2.default.createElement(
                'h1',
                null,
                product.name
              ),
              _react2.default.createElement(
                'h5',
                null,
                'dimensions: ',
                product.dimensions
              ),
              _react2.default.createElement(
                'h5',
                { className: 'col s6' },
                '$',
                product.price
              ),
              _react2.default.createElement(
                'p',
                { className: 'col s4 question' },
                'Ask a question'
              ),
              _react2.default.createElement(
                'div',
                { className: 'center' },
                _react2.default.createElement(_RaisedButton2.default, {
                  backgroundColor: 'rgba(149, 39, 39, 0.9)',
                  className: 'buttonTest',
                  label: 'ADD TO CART',
                  labelColor: '#fff',
                  onTouchTap: this.handleTouchTapCart,
                  style: styleButton
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col s10 offset-1 social-media' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 product-info-inner' },
              _react2.default.createElement('img', { src: '/images/Facebook.png', width: '65' }),
              _react2.default.createElement('img', { src: '/images/twitter.png', width: '65' }),
              _react2.default.createElement('img', { src: '/images/instagram.png', width: '65' }),
              _react2.default.createElement('img', { src: '/images/pinterest.png', width: '65' }),
              _react2.default.createElement('img', { src: '/images/tumblr.png', width: '65' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 description' },
          _react2.default.createElement(
            'h1',
            null,
            'Item Details'
          ),
          product.description
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'bottom-clouds footer' },
        _react2.default.createElement('img', { src: '/images/bottom-clouds.png' })
      ),
      _react2.default.createElement(
        'footer',
        null,
        'Web Design by - Team Super Secret Squirrel'
      )
    );
  }
});

exports.default = ProductPage;
});

require.register("components/RegisterPage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cancel = require('material-ui/svg-icons/navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _send = require('material-ui/svg-icons/content/send');

var _send2 = _interopRequireDefault(_send);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint-disable max-lines */


var schema = _joi2.default.object({
  firstName: _joi2.default.string().trim().max(255),
  lastName: _joi2.default.string().trim().max(255),
  email: _joi2.default.string().email().trim().min(6),
  phone: _joi2.default.string().allow('').trim().min(7).max(20).optional(),
  userName: _joi2.default.string().trim().min(6).max(255),
  password: _joi2.default.string().trim().min(8).max(255),
  confirmPassword: _joi2.default.string().trim().min(8).max(255),
  addressLine1: _joi2.default.string().trim().max(255),
  addressLine2: _joi2.default.string().allow('').trim().max(255).optional(),
  addressCity: _joi2.default.string().trim().max(255),
  addressState: _joi2.default.string().trim().length(2),
  addressZip: _joi2.default.string().trim().min(5).max(10),
  addressCountry: _joi2.default.string().trim().length(2)
});

var RegisterPage = _react2.default.createClass({
  displayName: 'RegisterPage',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      errors: {},
      reg: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userName: '',
        password: '',
        confirmPassword: '',
        addressLine1: '',
        addressLine2: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        addressCountry: 'US'
      },
      regFailText: '',
      open: false
    };
  },
  handleChange: function handleChange(event) {
    var name = event.target.name;
    var value = event.target.value;


    if (name === 'addressState' || name === 'addressCountry') {
      value = value.toUpperCase();
    }

    if (name === 'addressCity' && value.length === 1) {
      value = value.toUpperCase();
    }

    var nextReg = Object.assign({}, this.state.reg, _defineProperty({}, name, value));

    this.setState({ reg: nextReg });
  },
  handleTouchTapCancel: function handleTouchTapCancel() {
    this.props.router.goBack();
  },
  handleTouchTapReg: function handleTouchTapReg() {
    var _this = this;

    var reg = Object.assign({}, this.state.reg);
    var result = _joi2.default.validate(reg, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      var nextErrors = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = result.error.details[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var detail = _step.value;

          nextErrors[detail.path] = detail.message;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.setState({
        errors: nextErrors,
        open: true,
        regFailText: 'Registration form is incomplete!'
      });
    }

    if (reg.password !== reg.confirmPassword) {
      return this.setState({
        open: true,
        regFailText: 'Passwords do not match!'
      });
    }

    delete reg.confirmPassword;
    for (var key in reg) {
      if (reg[key] === '') {
        delete reg[key];
      }
    }

    _axios2.default.post('/api/customers', reg).then(function () {
      return _axios2.default.post('api/token', {
        userName: reg.userName,
        password: reg.password
      });
    }).then(function () {
      _this.props.updateCookies();
      _this.props.router.push('/');
    }).catch(function (err) {
      _this.setState({
        open: true,
        regFailText: err.response.data
      });
    });
  },
  handleRequestClose: function handleRequestClose() {
    this.setState({
      open: false,
      regFailText: ''
    });
  },
  handleBlur: function handleBlur(event) {
    var _event$target = event.target;
    var name = _event$target.name;
    var value = _event$target.value;

    var nextErrors = Object.assign({}, this.state.errors);
    var result = _joi2.default.validate(_defineProperty({}, name, value), schema);

    if (result.error) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = result.error.details[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var detail = _step2.value;

          nextErrors[detail.path] = detail.message;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } else {
      delete nextErrors[name];
    }

    this.setState({ errors: nextErrors });
  },
  handleKeyUp: function handleKeyUp(event) {
    if (event.which === 13) {
      this.handleTouchTapReg();
    }
  },
  render: function render() {
    var _state = this.state;
    var errors = _state.errors;
    var reg = _state.reg;

    // Necessary to make change event work after blur event.
    // Can't be done through CSS.

    var styleTextField = {
      display: 'block'
    };

    var stylePaper = {
      borderRadius: '5px'
    };

    var styleError = {
      marginTop: '-20px'
    };

    var failMessage = _react2.default.createElement(
      'div',
      null,
      this.state.regFailText
    );

    return _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'row reg-form' },
        _react2.default.createElement(
          _Paper2.default,
          {
            className: 'col s12 m10 offset-m1 center-align',
            onKeyUp: this.handleKeyUp,
            rounded: false,
            style: stylePaper,
            zDepth: 3
          },
          _react2.default.createElement(
            'h1',
            null,
            'User Registration'
          ),
          _react2.default.createElement(
            'div',
            { className: 'row form-row' },
            _react2.default.createElement(
              'div',
              { className: 'col s6' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.firstName,
                floatingLabelText: '* First Name',
                fullWidth: true,
                hintText: 'First name...',
                name: 'firstName',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.firstName
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s6' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.lastName,
                floatingLabelText: '* Last Name',
                fullWidth: true,
                hintText: 'Last name...',
                name: 'lastName',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.lastName
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row form-row' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 l6' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.email,
                floatingLabelText: '* Email',
                fullWidth: true,
                hintText: 'Email address...',
                name: 'email',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.email
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s12 l6' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.phone,
                floatingLabelText: 'Phone',
                fullWidth: true,
                hintText: 'Phone number...',
                name: 'phone',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                type: 'tel',
                value: reg.phone
              })
            )
          ),
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.userName,
            floatingLabelText: '* User Name',
            fullWidth: true,
            hintText: 'User name...',
            name: 'userName',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: reg.userName
          }),
          _react2.default.createElement(
            'div',
            { className: 'row form-row' },
            _react2.default.createElement(
              'div',
              { className: 'col s6' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.password,
                floatingLabelText: '* Password',
                fullWidth: true,
                hintText: 'Enter password...',
                name: 'password',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                type: 'password',
                value: reg.password
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s6' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.confirmPassword,
                floatingLabelText: '* Confirm Password',
                fullWidth: true,
                hintText: 'Re-enter password...',
                name: 'confirmPassword',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                type: 'password',
                value: reg.confirmPassword
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row form-row' },
            _react2.default.createElement(
              'div',
              { className: 'col s12 l6' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.addressLine1,
                floatingLabelText: '* Street address',
                fullWidth: true,
                hintText: 'Address line 1...',
                name: 'addressLine1',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.addressLine1
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s12 l6' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.addressLine2,
                floatingLabelText: 'Apt / Suite / Other',
                fullWidth: true,
                hintText: 'Address line 2...',
                name: 'addressLine2',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.addressLine2
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row form-row' },
            _react2.default.createElement(
              'div',
              { className: 'col s6 l5' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.addressCity,
                floatingLabelText: '* City',
                fullWidth: true,
                hintText: 'City name...',
                name: 'addressCity',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.addressCity
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s6 l2' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.addressState,
                floatingLabelText: '* State',
                fullWidth: true,
                hintText: 'State abrv...',
                name: 'addressState',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.addressState
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s6 l3' },
              _react2.default.createElement(_TextField2.default, {
                errorStyle: styleError,
                errorText: errors.addressZip,
                floatingLabelText: '* Zip code',
                fullWidth: true,
                hintText: '5-digit zip code...',
                name: 'addressZip',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.addressZip
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'col s6 l2' },
              _react2.default.createElement(_TextField2.default, {
                disabled: true,
                errorStyle: styleError,
                errorText: errors.addressCountry,
                floatingLabelText: '* Country',
                fullWidth: true,
                hintText: 'Country abrv...',
                name: 'addressCountry',
                onBlur: this.handleBlur,
                onChange: this.handleChange,
                style: styleTextField,
                value: reg.addressCountry
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row form-button-row' },
            _react2.default.createElement(_RaisedButton2.default, {
              className: 'col s4 offset-s1 l3 offset-l2 form-button',
              icon: _react2.default.createElement(_send2.default, null),
              label: 'Register',
              labelPosition: 'before',
              onTouchTap: this.handleTouchTapReg,
              primary: true
            }),
            _react2.default.createElement(_RaisedButton2.default, {
              className: 'col s4 offset-s2 l3 offset-l2 form-button',
              icon: _react2.default.createElement(_cancel2.default, null),
              label: 'Cancel',
              labelPosition: 'before',
              onTouchTap: this.handleTouchTapCancel,
              primary: true
            })
          )
        )
      ),
      _react2.default.createElement(_Snackbar2.default, {
        autoHideDuration: 3000,
        message: failMessage,
        onRequestClose: this.handleRequestClose,
        open: this.state.open
      })
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(RegisterPage);
});

require.register("components/Routes.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _AdminHomePage = require('components/AdminHomePage');

var _AdminHomePage2 = _interopRequireDefault(_AdminHomePage);

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

var _CartPage = require('components/CartPage');

var _CartPage2 = _interopRequireDefault(_CartPage);

var _HomePage = require('components/HomePage');

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = require('components/LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _NotFound = require('components/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _OrderHistoryPage = require('components/OrderHistoryPage');

var _OrderHistoryPage2 = _interopRequireDefault(_OrderHistoryPage);

var _PaymentPage = require('components/PaymentPage');

var _PaymentPage2 = _interopRequireDefault(_PaymentPage);

var _ProductPage = require('components/ProductPage');

var _ProductPage2 = _interopRequireDefault(_ProductPage);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RegisterPage = require('components/RegisterPage');

var _RegisterPage2 = _interopRequireDefault(_RegisterPage);

var _ThankYouPage = require('components/ThankYouPage');

var _ThankYouPage2 = _interopRequireDefault(_ThankYouPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = _react2.default.createClass({
  displayName: 'Routes',
  render: function render() {
    return _react2.default.createElement(
      _reactRouter.Router,
      { history: _reactRouter.browserHistory },
      _react2.default.createElement(
        _reactRouter.Route,
        { component: _App2.default, onChange: this.handleChange, path: '/' },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _HomePage2.default }),
        _react2.default.createElement(_reactRouter.Route, { component: _CartPage2.default, path: 'cart' }),
        _react2.default.createElement(_reactRouter.Route, { component: _LoginPage2.default, path: 'login' }),
        _react2.default.createElement(_reactRouter.Route, { component: _OrderHistoryPage2.default, path: 'orderhistory' }),
        _react2.default.createElement(_reactRouter.Route, { component: _PaymentPage2.default, path: 'payment' }),
        _react2.default.createElement(_reactRouter.Route, { component: _ProductPage2.default, path: 'product/:id' }),
        _react2.default.createElement(_reactRouter.Route, { component: _RegisterPage2.default, path: 'register' }),
        _react2.default.createElement(_reactRouter.Route, { component: _ThankYouPage2.default, path: 'thankyou' }),
        _react2.default.createElement(_reactRouter.Route, { component: _AdminHomePage2.default, path: 'adminhome' }),
        _react2.default.createElement(_reactRouter.Route, { component: _NotFound2.default, path: '*' })
      )
    );
  }
});

exports.default = Routes;
});

require.register("components/ShipAddress.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShipAddress = _react2.default.createClass({
  displayName: 'ShipAddress',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  handleBlur: function handleBlur(event) {
    this.props.processBlur(event);
  },
  handleChange: function handleChange(event) {
    this.props.processChange(event);
  },
  render: function render() {
    var _props = this.props;
    var errors = _props.errors;
    var address = _props.address;

    var styleTextField = {
      display: 'block'
    };

    var styleError = {
      marginTop: '-20px'
    };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.shipFirstName,
            floatingLabelText: '* First Name',
            fullWidth: true,
            hintText: 'First name...',
            name: 'shipFirstName',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.shipFirstName
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.shipLastName,
            floatingLabelText: '* Last Name',
            fullWidth: true,
            hintText: 'Last name...',
            name: 'shipLastName',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.shipLastName
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.shipAddressLine1,
            floatingLabelText: '* Street Address',
            fullWidth: true,
            hintText: 'Address Line 1...',
            name: 'shipAddressLine1',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.shipAddressLine1
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.shipAddressLine2,
            floatingLabelText: 'Apt / Suite / Other',
            fullWidth: true,
            hintText: 'Address Line 2...',
            name: 'shipAddressLine2',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.shipAddressLine2
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.shipAddressCity,
            floatingLabelText: '* City',
            fullWidth: true,
            hintText: 'City name...',
            name: 'shipAddressCity',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.shipAddressCity
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.shipAddressState,
            floatingLabelText: '* State',
            fullWidth: true,
            hintText: 'State abrv...',
            name: 'shipAddressState',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.shipAddressState
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row form-row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            errorStyle: styleError,
            errorText: errors.shipAddressZip,
            floatingLabelText: '* Zip Code',
            fullWidth: true,
            hintText: '5-digit zip code...',
            name: 'shipAddressZip',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.shipAddressZip
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m6' },
          _react2.default.createElement(_TextField2.default, {
            disabled: true,
            errorStyle: styleError,
            errorText: errors.shipAddressCountry,
            floatingLabelText: '* Country',
            fullWidth: true,
            hintText: 'Country abrv...',
            name: 'shipAddressCountry',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            style: styleTextField,
            value: address.shipAddressCountry
          })
        )
      )
    );
  }
});

exports.default = ShipAddress;
});

require.register("components/SquareForm.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SquareForm = _react2.default.createClass({
  displayName: 'SquareForm',

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { style: { marginTop: '14px' } },
      _react2.default.createElement(
        'label',
        null,
        'Card Number'
      ),
      _react2.default.createElement('div', { id: 'sq-card-number' }),
      _react2.default.createElement(
        'label',
        null,
        'CVV'
      ),
      _react2.default.createElement('div', { id: 'sq-cvv' }),
      _react2.default.createElement(
        'label',
        null,
        'Expiration Date'
      ),
      _react2.default.createElement('div', { id: 'sq-expiration-date' }),
      _react2.default.createElement(
        'label',
        null,
        'Postal Code'
      ),
      _react2.default.createElement('div', { id: 'sq-postal-code' }),
      _react2.default.createElement(
        'form',
        { id: 'nonce-form', noValidate: true },
        _react2.default.createElement('input', { id: 'card-nonce', name: 'nonce', type: 'hidden' })
      )
    );
  }
});

exports.default = SquareForm;
});

require.register("components/ThankYouPage.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThankYouPage = _react2.default.createClass({
  displayName: "ThankYouPage",

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "thanks-clouds" },
        _react2.default.createElement("img", { src: "/images/cloud-production-2.png" })
      ),
      _react2.default.createElement(
        "div",
        { className: "light-city" },
        _react2.default.createElement("img", { src: "/images/lightcity.png" })
      ),
      _react2.default.createElement(
        "div",
        { className: "hill2" },
        _react2.default.createElement("img", { src: "/images/hill2.png" })
      ),
      _react2.default.createElement(
        "div",
        { className: "congratulations" },
        _react2.default.createElement(
          "h2",
          null,
          "CONGRATULATIONS"
        ),
        _react2.default.createElement(
          "h5",
          null,
          "You're awesome and we want your friends to know!"
        ),
        _react2.default.createElement(
          "div",
          { className: "col s12 thanks-message" },
          _react2.default.createElement("img", { src: "/images/Facebook.png", width: "65" }),
          _react2.default.createElement("img", { src: "/images/twitter.png", width: "65" }),
          _react2.default.createElement("img", { src: "/images/instagram.png", width: "65" }),
          _react2.default.createElement("img", { src: "/images/pinterest.png", width: "65" }),
          _react2.default.createElement("img", { src: "/images/tumblr.png", width: "65" })
        )
      ),
      _react2.default.createElement(
        "footer",
        null,
        "Web Design by - Team Super Secret Squirrel"
      )
    );
  }
});

exports.default = ThankYouPage;
});

require.register("index.jsx", function(exports, require, module) {
'use strict';

var _colors = require('material-ui/styles/colors');

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Routes = require('components/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactTapEventPlugin2.default)();

var muiTheme = (0, _getMuiTheme2.default)({
  fontFamily: 'Roboto, sans-serif',

  palette: {
    primary1Color: '#952727',
    primary2Color: '#F110EC',

    // primary1Color: cyan500,
    // primary2Color: cyan700,
    // primary3Color: grey400,
    accent1Color: _colors.blue500

    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },

  flatButton: {
    // color: transparent,
    // buttonFilterColor: '#999999',
    // disabledTextColor: fade(palette.textColor, 0.3),
    // textColor: palette.textColor,
    // primaryTextColor: palette.primary1Color,
    // secondaryTextColor: palette.accent1Color,
    // fontSize: typography.fontStyleButtonFontSize,
    // fontWeight: typography.fontWeightMedium,
    buttonFilterColor: _colors.blue700,
    textColor: 'white'
  }
});

_reactDom2.default.render(_react2.default.createElement(
  _MuiThemeProvider2.default,
  { muiTheme: muiTheme },
  _react2.default.createElement(_Routes2.default, null)
), document.getElementById('app'));
});

require.alias("buffer/index.js", "buffer");
require.alias("crypto-browserify/index.js", "crypto");
require.alias("events/events.js", "events");
require.alias("path-browserify/index.js", "path");
require.alias("process/browser.js", "process");
require.alias("stream-browserify/index.js", "stream");
require.alias("string_decoder/index.js", "string_decoder");
require.alias("util/util.js", "sys");
require.alias("vm-browserify/index.js", "vm");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map