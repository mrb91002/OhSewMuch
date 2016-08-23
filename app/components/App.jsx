import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';

const App = React.createClass({
  getInitialState() {
    return {
      products: [],
      cart: []
    }
  },

  componentWillMount() {
    // console.log('componentWillMount');
    axios.get('/api/products')
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  componentDidMount() {
    // console.log('componentDidMount');
  },

  handleTouchTap() {
    // console.log('handleTouchtap');
  },

  handleTitleTouchTap() {
    this.props.router.push('/');
  },

  getChildrenProps() {
    const matchPath = this.props.routes.reduce((accum, route) => {
      // Sometimes route.path is undefined, so default to empty string
      return `${accum}${route.path || ''}`;
    }, '');

    const props = {
      '/': {
        products: this.state.products,
        cart: this.state.cart
      }
    };

    props['/product/:id'] = props['/'];

    return props[matchPath];
  },

  render() {
    // console.log('render');

    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
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
            label="New Post"
            onTouchTap={this.handleTouchTap}
            style={styleFlatButton}
          />
        </AppBar>
        <div style={{height: '64px'}}>
        </div>
      {/* React.cloneElement is the glue that passes in props to children created with React Router. React router instantiates classes for us, and cloning the existing instance is the only way to set props.*/}
      {React.cloneElement(this.props.children, this.getChildrenProps())}
      {/* {React.cloneElement(this.props.children, {
        products: this.state.products
      })} */}
    </div>;
  }
  // handleTouchTap(event) {
  //   console.log(event.target);
  // },
  //
  // render() {
  //   // console.log(getMuiTheme());
  //   return <div>
  //   <AppBar
  //     onTouchTap={this.handleTouchTap}
  //     title="Oh Sew Much"
  //   />
  //
  //     <h1>
  //       Hello world
  //     </h1>
  //   </div>;
  // }
});



export default withRouter(App);
