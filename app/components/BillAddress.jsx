import React from 'react';
import TextField from 'material-ui/TextField';

const BillAddress = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    const { errors, address } = this.props;
    const styleTextField = {
      display: 'block'
    };

    const  styleError = {
      marginTop: '-20px'
    };

    return <div>
      <div className="row form-row">
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.firstName}
            floatingLabelText="* First Name"
            fullWidth={true}
            hintText="First name..."
            name="firstName"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.firstName}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.lastName}
            floatingLabelText="* Last Name"
            fullWidth={true}
            hintText="Last name..."
            name="lastName"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.lastName}
          />
        </div>
      </div>

      <div className="row form-row">
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.email}
            floatingLabelText="* Email"
            fullWidth={true}
            hintText="Email address..."
            name="email"
            noValidate
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.email}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.phone}
            floatingLabelText="Phone"
            fullWidth={true}
            hintText="Phone number..."
            name="phone"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            type="tel"
            value={address.phone}
          />
        </div>
      </div>

      <div className="row form-row">
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.addressLine1}
            floatingLabelText="* Street Address"
            fullWidth={true}
            hintText="Address Line 1..."
            name="addressLine1"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.addressLine1}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.addressLine2}
            floatingLabelText="Apt / Suite / Other"
            fullWidth={true}
            hintText="Address Line 2..."
            name="addressLine2"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.addressLine2}
          />
        </div>
      </div>

      <div className="row form-row">
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.addressCity}
            floatingLabelText="* City"
            fullWidth={true}
            hintText="City name..."
            name="addressCity"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.addressCity}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.addressState}
            floatingLabelText="* State"
            fullWidth={true}
            hintText="State abrv..."
            name="addressState"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.addressState}
          />
        </div>
      </div>

      <div className="row form-row">
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.addressZip}
            floatingLabelText="* Zip Code"
            fullWidth={true}
            hintText="5-digit zip code..."
            name="addressZip"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.addressZip}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            disabled={true}
            errorStyle={styleError}
            errorText={errors.addressCountry}
            floatingLabelText="* Country"
            fullWidth={true}
            hintText="Country abrv..."
            name="addressCountry"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.addressCountry}
          />
        </div>
      </div>

    </div>;
  }
});

export default BillAddress;
