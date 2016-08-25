import { Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { withRouter } from 'react-router';
import axios from 'axios';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Joi from 'joi';
import OrderSummary from 'components/OrderSummary';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Paper from 'material-ui/Paper';
import Send from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';
import SquareForm from 'components/SquareForm';
import TextField from 'material-ui/TextField';
import weakKey from 'weak-key';

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

          // No errors occurred. Extract the card nonce or cardData
          }
          else {
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
    // Necessary to initialize payment form on dynamic insertion
    paymentForm.build();
    this.setState({ paymentForm: paymentForm });
  },

  componentWillUnmount() {
    // Necessary to prevent memory leaks and unwanted event handlers
    this.state.paymentForm.destroy();
  },

  handleTouchTapSubmit(event) {
    this.state.paymentForm.requestCardNonce();
  },

  handleTouchTapCancel(event) {
    console.log('cancel');
  },

  render() {
    const palette = this.context.muiTheme.palette;

    return <div className="container">
      <div className="row payment-form">
        <Paper
          className="col s12"
          rounded={false}
          zDepth={3}
        >
          <OrderSummary cart={this.props.cart}/>


          {/* These div elements are the placeholder elements that are replaced by the SqPaymentForm's iframes. */}
          <div className="row">
            <div className="col s12 m6 l4">
              <SquareForm />
            </div>
          </div>


          <div className="row">
            <RaisedButton
              className="col s4 offset-s1 l3 offset-l2 form-button"
              icon={<Send />}
              label="Submit"
              labelPosition="before"
              onTouchTap={this.handleTouchTapSubmit}
              primary={true}
            />
            <RaisedButton
              className="col s4 offset-s2 l3 offset-l2 form-button"
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
        message={this.state.payFailText}
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
    </div>;
  }
});

export default withRouter(PaymentPage);
