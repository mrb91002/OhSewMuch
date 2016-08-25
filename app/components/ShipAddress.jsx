import React from 'react';
import TextField from 'material-ui/TextField';

const ShipAddress = React.createClass({
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
            errorText={errors.shipFirstName}
            floatingLabelText="* First Name"
            fullWidth={true}
            hintText="First name..."
            name="shipFirstName"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.shipFirstName}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.shipLastName}
            floatingLabelText="* Last Name"
            fullWidth={true}
            hintText="Last name..."
            name="shipLastName"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.shipLastName}
          />
        </div>
      </div>

      <div className="row form-row">
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.shipAddressLine1}
            floatingLabelText="* Street Address"
            fullWidth={true}
            hintText="Address Line 1..."
            name="shipAddressLine1"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.shipAddressLine1}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.shipAddressLine2}
            floatingLabelText="Apt / Suite / Other"
            fullWidth={true}
            hintText="Address Line 2..."
            name="shipAddressLine2"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.shipAddressLine2}
          />
        </div>
      </div>

      <div className="row form-row">
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.shipAddressCity}
            floatingLabelText="* City"
            fullWidth={true}
            hintText="City name..."
            name="shipAddressCity"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.shipAddressCity}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.shipAddressState}
            floatingLabelText="* State"
            fullWidth={true}
            hintText="State abrv..."
            name="shipAddressState"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.shipAddressState}
          />
        </div>
      </div>

      <div className="row form-row">
        <div className="col s12 m6">
          <TextField
            errorStyle={styleError}
            errorText={errors.shipAddressZip}
            floatingLabelText="* Zip Code"
            fullWidth={true}
            hintText="5-digit zip code..."
            name="shipAddressZip"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.shipAddressZip}
          />
        </div>
        <div className="col s12 m6">
          <TextField
            disabled={true}
            errorStyle={styleError}
            errorText={errors.shipAddressCountry}
            floatingLabelText="* Country"
            fullWidth={true}
            hintText="Country abrv..."
            name="shipAddressCountry"
            onBlur={this.props.handleBlur}
            onChange={this.props.handleChange}
            style={styleTextField}
            value={address.shipAddressCountry}
          />
        </div>
      </div>

    </div>;
  }
});

export default ShipAddress;
