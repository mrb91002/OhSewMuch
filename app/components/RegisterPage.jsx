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

const pw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const schema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(255),
  lastName: Joi.string()
    .trim()
    .max(255),
  email: Joi.string()
    .email()
    .trim()
    .min(6),
  phone: Joi.string()
    .trim()
    .min(7)
    .max(20),
  userName: Joi.string()
    .trim()
    .min(6)
    .max(255),
  password: Joi.string()
    .trim()
    .min(8)
    .max(255)
    .regex(pw, '1 Cap, 1 Lower, 1 Special'),
  confirmPassword: Joi.string()
    .trim()
    .min(8)
    .max(255)
    .regex(pw, '1 Cap, 1 Lower, 1 Special'),
  addressLine1: Joi.string()
    .trim()
    .max(255),
  addressLine2: Joi.string()
    .allow('')
    .trim()
    .max(255)
    .optional(),
  addressCity: Joi.string()
    .trim()
    .max(255),
  addressState: Joi.string()
    .trim()
    .length(2),
  addressZip: Joi.string()
    .trim()
    .min(5)
    .max(10),
  addressCountry: Joi.string()
    .trim()
    .length(2)
});

const Register = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getInitialState() {
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
        addressCountry: ''
      },
      regFailText: '',
      open: false,
    };
  },

  handleChange(event) {
    const { name } = event.target;
    let { value } = event.target;

    if (name === 'addressState' || name === 'addressCountry') {
      value = value.toUpperCase();
    }

    if (name === 'addressCity' && value.length === 1) {
      value = value.toUpperCase();
    }

    const nextReg = Object.assign({}, this.state.reg, { [name]: value });

    this.setState({ reg: nextReg });
  },

  handleTouchTapCancel() {
    // this.props.router.push('/');
    this.props.router.goBack();
  },

  handleTouchTapReg() {
    const reg = Object.assign({}, this.state.reg);
    const result = Joi.validate(reg, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const nextErrors = {};

      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
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
    for (const key in reg) {
      if (reg[key] === '') {
        delete reg[key];
      }
    }

    axios.post('/api/customers', reg)
      .then((res) => {
        return axios.post('api/token', {
          userName: reg.userName,
          password: reg.password
        });
      })
      .then((res) => {
        this.props.updateCookies();
        this.props.router.push('/');
      })
      .catch((err) => {
        this.setState({
          open: true,
          regFailText: err.response.data
        });
      });
  },

  handleRequestClose() {
    this.setState({
      open: false,
      regFailText: ''
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
      this.handleTouchTapReg();
    }
  },

  render() {
    const { errors, reg } = this.state;

    // Necessary to make change event work after blur event.
    // Can't be done through CSS.
    const styleTextField = {
      display: 'block'
    };

    const styleRaisedButton = {
      borderRadius: '3px'
    };

    const stylePaper = {
      borderRadius: '5px'
    };

    const  styleError = {
      marginTop: '-20px'
    };

    const failMessage = <div>{this.state.regFailText}</div>;

    return <div className="container">
      <div className="row reg-form">
        <Paper
          className="col s12 m10 offset-m1 center-align"
          onKeyUp={this.handleKeyUp}
          rounded={false}
          style={stylePaper}
          zDepth={3}
        >
          <h1>User Registration</h1>

          <div className="row reg-form-row">
            <div className="col s6">
              <TextField
                errorStyle={styleError}
                errorText={errors.firstName}
                floatingLabelText="First Name"
                fullWidth={true}
                hintText="First name..."
                name="firstName"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.firstName}
              />
            </div>

            <div className="col s6">
              <TextField
                errorStyle={styleError}
                errorText={errors.lastName}
                floatingLabelText="Last Name"
                fullWidth={true}
                hintText="Last name..."
                name="lastName"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.lastName}
              />
            </div>
          </div>

          <div className="row reg-form-row">
            <div className="col s12 l6">
              <TextField
                errorStyle={styleError}
                errorText={errors.email}
                floatingLabelText="Email"
                fullWidth={true}
                hintText="Email address..."
                name="email"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.email}
              />
            </div>
            <div className="col s12 l6">
              <TextField
                errorStyle={styleError}
                errorText={errors.phone}
                floatingLabelText="Phone"
                fullWidth={true}
                hintText="Phone number..."
                name="phone"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                type='phone'
                value={reg.phone}
              />
            </div>
          </div>
          <TextField
            errorStyle={styleError}
            errorText={errors.userName}
            floatingLabelText="User Name"
            fullWidth={true}
            hintText="User name..."
            name="userName"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            style={styleTextField}
            value={reg.userName}
          />
          <div className="row reg-form-row">
            <div className="col s6">
              <TextField
                errorStyle={styleError}
                errorText={errors.password}
                floatingLabelText="Password"
                fullWidth={true}
                hintText="Enter password..."
                name="password"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                type="password"
                value={reg.password}
              />
            </div>
            <div className="col s6">
              <TextField
                errorStyle={styleError}
                errorText={errors.confirmPassword}
                floatingLabelText="Confirm Password"
                fullWidth={true}
                hintText="Re-enter password..."
                name="confirmPassword"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                type="password"
                value={reg.confirmPassword}
              />
            </div>
          </div>

          <div className="row reg-form-row">
            <div className="col s12 l6">
              <TextField
                errorStyle={styleError}
                errorText={errors.addressLine1}
                floatingLabelText="Street address"
                fullWidth={true}
                hintText="Address line 1..."
                name="addressLine1"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.addressLine1}
              />
            </div>
            <div className="col s12 l6">
              <TextField
                errorStyle={styleError}
                errorText={errors.addressLine2}
                floatingLabelText="Apt / Suite / Other"
                fullWidth={true}
                hintText="Address line 2..."
                name="addressLine2"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.addressLine2}
              />
            </div>
          </div>

          <div className="row reg-form-row">
            <div className="col s6 l5">
              <TextField
                errorStyle={styleError}
                errorText={errors.addressCity}
                floatingLabelText="City"
                fullWidth={true}
                hintText="City name..."
                name="addressCity"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.addressCity}
              />
            </div>
            <div className="col s6 l2">
              <TextField
                errorStyle={styleError}
                errorText={errors.addressState}
                floatingLabelText="State"
                fullWidth={true}
                hintText="State abrv."
                name="addressState"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.addressState}
              />
            </div>
            <div className="col s6 l3">
              <TextField
                errorStyle={styleError}
                errorText={errors.addressZip}
                floatingLabelText="Zip code"
                fullWidth={true}
                hintText="5-digit zip code..."
                name="addressZip"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.addressZip}
              />
            </div>
            <div className="col s6 l2">
              <TextField
                errorStyle={styleError}
                errorText={errors.addressCountry}
                floatingLabelText="Country"
                fullWidth={true}
                hintText="Country abrv..."
                name="addressCountry"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={styleTextField}
                value={reg.addressCountry}
              />
            </div>
          </div>

          <div className="row reg-form-button-row">
            <RaisedButton
              className="col s4 offset-s1 l3 offset-l2 reg-form-button"
              icon={<Send />}
              label="Register"
              labelPosition="before"
              onTouchTap={this.handleTouchTapReg}
              primary={true}
              // style={styleRaisedButton}
            />

            <RaisedButton
              className="col s4 offset-s2 l3 offset-l2 reg-form-button"
              icon={<Cancel />}
              label="Cancel"
              labelPosition="before"
              onTouchTap={this.handleTouchTapCancel}
              primary={true}
              // secondary={true}
              // style={styleRaisedButton}
            />
          </div>
        </Paper>

      </div>
      <Snackbar
        open={this.state.open}
        message={failMessage}
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
    </div>;
  }
});

export default withRouter(Register);
