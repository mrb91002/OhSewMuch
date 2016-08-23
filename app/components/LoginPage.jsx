import AssignmentReturned
  from 'material-ui/svg-icons/action/assignment-returned';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Joi from 'joi';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const schema = Joi.object({
  userName: Joi.string().trim().min(6).max(255),
  password: Joi.string().trim().min(8).max(255)
});

const Login = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      errors: {},
      login: {
        userName: '',
        password: ''
      }
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

  render() {
    const { errors, login } = this.state;

    return <div className="container">
      <div className="row login-form">
        <Paper
          className="col s12 m8 offset-m2 l6 offset-l3 center-align"
          rounded={false}
          zDepth={1}
        >
          <h1>Login</h1>

          <TextField
            errorText={errors.userName}
            floatingLabelText="User Name"
            fullWidth={true}
            hintText="Enter your user name..."
            name="userName"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            value={login.userName}
          />

          <TextField
            className="login-paper"
            errorText={errors.password}
            floatingLabelText="Password"
            fullWidth={true}
            hintText="Enter your password..."
            name="password"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            type="password"
            value={login.password}
          />

          <div className="row">
            <RaisedButton
              className="col s3 offset-s2 login-form-button"
              icon={<AssignmentReturned />}
              label="login"
              // labelPosition="before"
              // onTouchTap={this.handleTouchTapSave}
              primary={true}
              // style={styleRaisedButton}
            />

            <RaisedButton
              className="col s3 offset-s2 login-form-button"
              icon={<Cancel />}
              label="Cancel"
              // labelPosition="before"
              // onTouchTap={this.handleTouchTapCancel}
              primary={true}
              // style={styleRaisedButton}
            />
          </div>


        </Paper>
      </div>
    </div>;
  }
});

export default Login;
