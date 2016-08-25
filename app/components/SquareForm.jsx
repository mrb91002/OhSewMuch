import React from 'react';

const SquareForm = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    console.log('render');
    return <div>
      <label>Card Number</label>
      <div id="sq-card-number"></div>
      <label>CVV</label>
      <div id="sq-cvv"></div>
      <label>Expiration Date</label>
      <div id="sq-expiration-date"></div>
      <label>Postal Code</label>
      <div id="sq-postal-code"></div>
      {/* Hidden form required for Square API */}
      <form id="nonce-form" noValidate>
        <input type="hidden" id="card-nonce" name="nonce" />
      </form>
    </div>;
  }
});

export default SquareForm;
