import { withRouter } from 'react-router';
import axios from 'axios';
import React from 'react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

const PaymentPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      errors: {},
      open: false,
      payFailText: '',
      paymentForm: {}
    };
  },

  handleRequestClose() {
    this.setState({
      open: false,
      payFailText: ''
    });
  },

  componentDidMount() {
    // Sandbox AppID
    const applicationId = 'sandbox-sq0idp-JQWJQ16-z103Dcor0PDo4Q';

    // The payment form
    const paymentForm = new SqPaymentForm({
      applicationId: applicationId,
      inputClass: 'sq-input',
      inputStyles: [
        {
          fontSize: '15px'
        }
      ],
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
        cardNonceResponseReceived: function(errors, nonce, cardData) {
          if (errors) {
            console.log("Encountered errors:");

            // This logs all errors encountered during nonce generation to the
            // Javascript console.
            errors.forEach(function(error) {
              console.log('  ' + error.message);
            });

          // No errors occurred. Extract the card nonce.
          } else {

            // Delete this line and uncomment the lines below when you're ready
            // to start submitting nonces to your server.
            // alert('Nonce received: ' + nonce);
            console.log(nonce);
            console.log(cardData);

            /*
              These lines assign the generated card nonce to a hidden input
              field, then submit that field to your server.
              Uncomment them when you're ready to test out submitting nonces.

              You'll also need to set the action attribute of the form element
              at the bottom of this sample, to correspond to the URL you want to
              submit the nonce to.
            */
            // document.getElementById('card-nonce').value = nonce;
            // document.getElementById('nonce-form').submit();
            axios.post('/api/payment', {
              nonce: nonce,
              amount: 10.21
            })
            .then((apiRes) => {
              console.log(apiRes)
            })
            .catch((err) => {
              console.log(err);
            });
          }
        },

        unsupportedBrowserDetected: function() {
          // Fill in this callback to alert buyers when their browser is not supported.
        },

        // Fill in these cases to respond to various events that can occur while a
        // buyer is using the payment form.
        inputEventReceived: function(inputEvent) {
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
          }
        }
      }
    });

    this.setState({ paymentForm: paymentForm });
  },

  // This function is called when a buyer clicks the Submit button on the webpage to charge their card.
  requestCardNonce(event) {
    // console.log(e);
    // This prevents the Submit button from submitting its associated form.
    // Instead, clicking the Submit button should tell the SqPaymentForm to generate a card nonce, which the next line does.
    // e.preventDefault();
    // e.nativeEvent.preventDefault();

    event.preventDefault();
    this.state.paymentForm.requestCardNonce();
  },

  render() {
    return <div className="container">
      <div className="row payment-form">
        <Paper
          className="col s12 m8 offset-m2 center-align"
          // onKeyUp={this.handleKeyUp}
          rounded={false}
          zDepth={3}
        >
          <h1>Payment processing via Square</h1>

          {/* These div elements are the placeholder elements that are replaced by the SqPaymentForm's iframes. */}
          <label>Card Number</label>
          <div id="sq-card-number"></div>
          <label>CVV</label>
          <div id="sq-cvv"></div>
          <label>Expiration Date</label>
          <div id="sq-expiration-date"></div>
          <label>Postal Code</label>
          <div id="sq-postal-code"></div>

          {/* After the SqPaymentForm generates a card nonce, *this* form POSTs the generated card nonce to your application's server. You should replace the action attribute of the form with the path of the URL you want to POST the nonce to (for example, "/process-card") */}
          {/* <form id="nonce-form" noValidate> */}
          <form id="nonce-form" noValidate action="/api/payment" method="post">
          {/* Whenever a nonce is generated, it's assigned as the value of this hidden input field. */}
            <input type="hidden" id="card-nonce" name="nonce" />
            {/* Clicking this Submit button kicks off the process to generate a card nonce from the buyer's card information. */}
            <input type="button" onTouchTap={this.requestCardNonce} value="Button"/>
          </form>
        </Paper>

      </div>
      <Snackbar
        open={this.state.open}
        message={this.state.payFailText}
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
    </div>;
  }
});

export default withRouter(PaymentPage);
