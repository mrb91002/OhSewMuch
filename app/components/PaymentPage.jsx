import { withRouter } from 'react-router';
import axios from 'axios';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Joi from 'joi';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Paper from 'material-ui/Paper';
import Send from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';
import { Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
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

    paymentForm.build();
    this.setState({ paymentForm: paymentForm });
  },

  // This function is called when a buyer clicks the Submit button on the webpage to charge their card.
  handleTouchTapSubmit(event) {
    // console.log(e);
    // This prevents the Submit button from submitting its associated form.
    // Instead, clicking the Submit button should tell the SqPaymentForm to generate a card nonce, which the next line does.
    // e.preventDefault();
    // e.nativeEvent.preventDefault();

    event.preventDefault();
    this.state.paymentForm.requestCardNonce();
  },

  handleTouchTapCancel(event) {
    console.log('cancel');
  },

  render() {
    const total = this.props.cart.reduce((accum, item) => {
      return accum + item.quantity * item.product.price;
    }, 0);
    const palette = this.context.muiTheme.palette;
    const styleHeader = {
      color: palette.accent1Color,
      marginBottom: '0px'
    };

    const styleSubHeader = {
      color: palette.textColor,
      marginTop: '5px',
      marginBottom: 0
    };

    return <div className="container">
      <div className="row payment-form">
        <Paper
          className="col s12"
          rounded={false}
          zDepth={3}
        >
          <div className="pay-headers">
            <h1 style={styleHeader}>Payment Summary</h1>
            <p style={styleSubHeader}>Please review the following details for this transaction.</p>
          </div>
          <Table style={{tableLayout: 'auto'}}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{width: '50%'}}>
                  Product
                </TableHeaderColumn>
                <TableHeaderColumn style={{width: '12.5%'}}>
                  Qty
                  </TableHeaderColumn>
                <TableHeaderColumn style={{width: '18.75%'}}>
                  Price
                </TableHeaderColumn>
                <TableHeaderColumn style={{width: '18.75%'}}>
                  Subtotal
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}
              // displayBorder={true}
            >
              {this.props.cart.map((item) => {
                console.log(item);
                return <TableRow key={weakKey(item)}>
                  <TableRowColumn style={{width: '50%'}}>
                    {item.product.name}
                  </TableRowColumn>
                  <TableRowColumn style={{width: '12.5%'}}>
                    {item.quantity}
                  </TableRowColumn>
                  <TableRowColumn style={{width: '18.75%'}}>
                    {item.product.price.toFixed(2)}
                  </TableRowColumn>
                  <TableRowColumn style={{width: '18.75%'}}>
                    {(item.product.price * item.quantity).toFixed(2)}
                  </TableRowColumn>
                </TableRow>;
              })}
              {/* <TableRow>
                <TableRowColumn>Some cool shit</TableRowColumn>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>$34.95</TableRowColumn>
              </TableRow> */}
              <TableRow>
                <TableRowColumn></TableRowColumn>
                <TableRowColumn></TableRowColumn>
                <TableRowColumn style={{ textAlign: 'right' }}>Total:</TableRowColumn>
                <TableRowColumn>${total.toFixed(2)}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>

          {/* These div elements are the placeholder elements that are replaced by the SqPaymentForm's iframes. */}

          <div className="row">
            <div className="col s12 m6 l4">
              <label>Card Number</label>
              <div id="sq-card-number"></div>
              <label>CVV</label>
              <div id="sq-cvv"></div>
              <label>Expiration Date</label>
              <div id="sq-expiration-date"></div>
              <label>Postal Code</label>
              <div id="sq-postal-code"></div>
            </div>
          </div>
          {/* After the SqPaymentForm generates a card nonce, *this* form POSTs the generated card nonce to your application's server. You should replace the action attribute of the form with the path of the URL you want to POST the nonce to (for example, "/process-card") */}
          {/* <form id="nonce-form" noValidate> */}
          <form id="nonce-form" noValidate action="/api/payment" method="post">
          {/* Whenever a nonce is generated, it's assigned as the value of this hidden input field. */}
            <input type="hidden" id="card-nonce" name="nonce" />
            {/* Clicking this Submit button kicks off the process to generate a card nonce from the buyer's card information. */}
            {/* <input type="button" onTouchTap={this.requestCardNonce} value="Button"/> */}
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
