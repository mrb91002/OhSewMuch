import React from 'react';

const SquareForm = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render() {
    return <div style={{ marginTop: '14px' }}>
      <label>Card Number</label>
      {/* These div elements are the placeholder elements */}
      {/* that are replaced by the SqPaymentForm's iframes. */}
      <div id="sq-card-number" />
      <label>CVV</label>
      <div id="sq-cvv" />
      <label>Expiration Date</label>
      <div id="sq-expiration-date" />
      <label>Postal Code</label>
      <div id="sq-postal-code" />
      {/* Hidden form required for Square API */}
      <form id="nonce-form" noValidate={true}>
        <input id="card-nonce" name="nonce" type="hidden" />
      </form>
    </div>;
  }
});

export default SquareForm;
