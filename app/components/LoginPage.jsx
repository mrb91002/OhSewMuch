import { withRouter } from 'react-router';
import axios from 'axios';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Joi from 'joi';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Send from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';

const schema = Joi.object({
  userName: Joi.string()
    .trim()
    .max(255),
  password: Joi.string()
    .trim()
    .max(255)
});

const LoginPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      errors: {},
      login: {
        userName: '',
        password: ''
      },
      loginFailText: '',
      open: false,
    };
  },

  handleChange(event) {
    const { name, value } = event.target;
    const nextLogin = Object.assign({}, this.state.login, { [name]: value });

    this.setState({ login: nextLogin });
  },

  // handleChange(event) {
  //   const { name, value } = event.target;
  //   const nextLogin = Object.assign({}, this.state.login, { [name]: value });
  //   const nextErrors = Object.assign({}, this.state.errors);
  //   const result = Joi.validate({ [name]: value }, schema);
  //
  //   if (result.error) {
  //     for (const detail of result.error.details) {
  //       nextErrors[detail.path] = detail.message;
  //     }
  //   }
  //   else {
  //     delete nextErrors[name];
  //   }
  //
  //   this.setState({ errors: nextErrors, login: nextLogin });
  // },

  handleTouchTapCancel() {
    // this.props.router.push('/');
    this.props.router.goBack();
  },

  handleTouchTapLogin() {
    const result = Joi.validate(this.state.login, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const nextErrors = {};

      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    axios.post('/api/token', this.state.login)
      .then((res) => {
        this.props.updateCookies();
        this.props.router.push('/');
      })
      .catch((err) => {
        this.setState({
          open: true,
          loginFailText: err.response.data
        });
      });
  },

  handleRequestClose() {
    this.setState({
      open: false,
      loginFailText: ''
    });
  },

  handleBlur(event) {
    const { name, value } = event.target;
    const nextErrors = Object.assign({}, this.state.errors);
    const result = Joi.validate({ [name]: value }, schema);

    if (result.error) {
      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }
    }
    else {
      delete nextErrors[name];
    }

    this.setState({ errors: nextErrors });
  },

  handleKeyUp(event) {
    if (event.which === 13) {
      this.handleTouchTapLogin();
    }
  },

  render() {
    const { errors, login } = this.state;

    // Necessary to make change event work after blur event.
    // Can't be done through CSS.
    const styleTextField = {
      display: 'block'
    };

    return <div className="container">
      <div className="row login-form">
        <Paper
          className="col s12 m8 offset-m2 center-align"
          onKeyUp={this.handleKeyUp}
          rounded={false}
          zDepth={3}
        >
          <h1>Login</h1>

          <TextField
            className="login-form-button"
            errorText={errors.userName}
            floatingLabelText="User Name"
            fullWidth={true}
            hintText="Enter your user name..."
            name="userName"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            style={styleTextField}
            value={login.userName}
          />

          <TextField
            className="login-form-button"
            errorText={errors.password}
            floatingLabelText="Password"
            fullWidth={true}
            hintText="Enter your password..."
            name="password"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            style={styleTextField}
            type="password"
            value={login.password}
          />

          <div className="row login-form-button-row">
            <RaisedButton
              className="col s4 offset-s1 l3 offset-l2 login-form-button"
              icon={<Send />}
              label="Login"
              labelPosition="before"
              onTouchTap={this.handleTouchTapLogin}
              primary={true}
            />

            <RaisedButton
              className="col s4 offset-s2 l3 offset-l2 login-form-button"
              icon={<Cancel />}
              label="Cancel"
              labelPosition="before"
              onTouchTap={this.handleTouchTapCancel}
              primary={true}
            />
          </div>
        </Paper>

      </div>
      <Snackbar
        open={this.state.open}
        message={this.state.loginFailText}
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
    </div>;
  }
});

export default withRouter(LoginPage);
