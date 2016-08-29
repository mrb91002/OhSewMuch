/* eslint-disable max-lines */
import BillAddress from 'components/BillAddress';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Checkbox from 'material-ui/Checkbox';
import Joi from 'joi';
import OrderSummary from 'components/OrderSummary';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Send from 'material-ui/svg-icons/content/send';
import ShipAddress from 'components/ShipAddress';
import Snackbar from 'material-ui/Snackbar';
import SquareForm from 'components/SquareForm';
import axios from 'axios';
import { camelizeKeys } from 'humps';
import { withRouter } from 'react-router';

let state;
let props;

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
    .allow('')
    .trim()
    .min(7)
    .max(20)
    .optional(),
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
    .length(2),
  shipFirstName: Joi.string()
    .trim()
    .max(255),
  shipLastName: Joi.string()
    .trim()
    .max(255),
  shipAddressLine1: Joi.string()
    .trim()
    .max(255),
  shipAddressLine2: Joi.string()
    .allow('')
    .trim()
    .max(255)
    .optional(),
  shipAddressCity: Joi.string()
    .trim()
    .max(255),
  shipAddressState: Joi.string()
    .trim()
    .length(2),
  shipAddressZip: Joi.string()
    .trim()
    .min(5)
    .max(10),
  shipAddressCountry: Joi.string()
    .trim()
    .length(2)
});

const PaymentPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      errors: {},
      open: false,
      payFailText: '',
      paymentForm: {},
      address: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        addressCountry: 'US',
        shipFirstName: '',
        shipLastName: '',
        shipAddressLine1: '',
        shipAddressLine2: '',
        shipAddressCity: '',
        shipAddressState: '',
        shipAddressZip: '',
        shipAddressCountry: 'US'
      },
      shipping: false
    };
  },

  componentWillMount() {
    if (!Object.keys(this.props.cookies).length) {
      return;
    }

    props = this.props;
    this.getCustomerInfo(this.props);
  },

  componentDidMount() {
    // Sandbox AppID
    const applicationId = 'sandbox-sq0idp-JQWJQ16-z103Dcor0PDo4Q';

    // The payment form
    // eslint-disable-next-line no-undef
    const paymentForm = new SqPaymentForm({
      applicationId,
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
        // Params available below: (errors, nonce, cardData)
        cardNonceResponseReceived(errors, nonce) {
          if (errors) {
            // eslint-disable-next-line no-console
            console.log('Encountered errors:');

            // This logs all errors encountered during nonce generation to the
            // Javascript console.
            errors.forEach((error) => {
              // eslint-disable-next-line no-console
              console.log(`  ${error.message}`);
            });

          // No errors occurred. Extract the card nonce or cardData
          }
          else {
            const products = [];

            // Hard coded ship-type and Promo skipped
            const shipType = 'UPS: Standard';
            const order = {};
            let newCustomer;
            const total = props.cart.reduce((accum, item) => {
              return accum + item.quantity * item.product.price;
            }, 0);

            axios.post('/api/payment', {
              nonce,
              amount: total
            })
            .then(() => {
              // Need to store apiRes for credit authorization at some point.
              for (const item of props.cart) {
                for (let i = 0; i < item.quantity; i++) {
                  products.push(item.product.id);
                }
              }

              // Need promo and shiptype processed here

              // Loop address and remove blank fields
              const cust = Object.assign({}, state.address);

              for (const key in cust) {
                if (!cust[key]) {
                  delete cust[key];
                }
              }

              // Need to get a customer or patch existing
              if (!props.cookies.loggedIn) {
                return axios.post('api/customers', cust);
              }

              // Should only patch if necessary, but patching all is a shortcut
              // to get this done quicker.
              return axios.patch('api/customer', cust);
            })
            .then((customer) => {
              newCustomer = camelizeKeys(customer.data);
              if (!props.cookies.loggedIn) {
                order.customerId = newCustomer.id;
              }

              // Would also add promoId at this point
              order.shipType = shipType;
              order.products = products;

              return axios.post('api/orders', order);
            })
            .then(() => {
              // Need to store newOrder to state of App.
              // Need to navigate to thank you page.
              props.clearCart();
              props.router.push('/thankyou');
            })
            .catch((err) => {
              // need to handle address errors in toast or equiv.
              // eslint-disable-next-line no-console
              console.log(err.response || err);
            });
          }
        },

        unsupportedBrowserDetected() {
          // Fill in this callback to alert buyers
          // when their browser is not supported.
        },

        // Fill in these cases to respond to various events that
        // can occur while a buyer is using the payment form.
        inputEventReceived(inputEvent) {
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
            default:
              break;
          }
        }
      }
    });

    // Necessary to initialize payment form on dynamic insertion
    paymentForm.build();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ paymentForm });
  },

  componentWillReceiveProps(nextProps) {
    props = nextProps;
    this.getCustomerInfo(nextProps);
  },

  componentWillUnmount() {
    // Necessary to prevent memory leaks and unwanted event handlers
    this.state.paymentForm.destroy();
  },

  getCustomerInfo(properties) {
    if (properties.cookies.loggedIn) {
      axios.get('api/customer')
        .then((apiRes) => {
          const customer = apiRes.data;
          const nextAddress = {};

          delete customer.id;
          delete customer.userName;

          for (const key in customer) {
            if (customer[key]) {
              nextAddress[key] = customer[key];
            }
            else {
              nextAddress[key] = '';
            }
          }
          this.setState({ address: nextAddress });
        })
        .catch((err) => {
          console.log(err.response); // eslint-disable-line no-console
        });
    }
  },

  handleRequestClose() {
    this.setState({
      open: false,
      payFailText: ''
    });
  },

  handleBlur(event) {
    this.processBlur(event);
  },

  handleChange(event) {
    this.processChange(event);
  },

  handleTouchTapSubmit() {
    state = this.state;
    props = this.props;
    this.state.paymentForm.requestCardNonce();
  },

  handleTouchTapCancel() {
    this.props.router.push('/');
  },

  handleCheck(event, isChecked) {
    this.setState({ shipping: isChecked });
  },

  displayShipping() {
    if (this.state.shipping) {
      return { display: 'block' };
    }

    return { display: 'none' };
  },

  processBlur(event) {
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

  processChange(event) {
    const { address } = this.state;
    const { name } = event.target;
    let { value } = event.target;

    if (name === 'addressState' || name === 'addressCountry' ||
      name === 'shipAddressState' || name === 'shipAddressCountry') {
      value = value.toUpperCase();
    }

    if (value.length === 1) {
      if (name === 'addressCity' || name === 'shipAddressCity') {
        value = value.toUpperCase();
      }

      if (name === 'firstName' || name === 'lastName') {
        value = value.toUpperCase();
      }

      if (name === 'shipFirstName' || name === 'shipLastName') {
        value = value.toUpperCase();
      }
    }

    const nextAddress = Object.assign({}, address, { [name]: value });

    this.setState({ address: nextAddress });
  },

  render() {
    // Necessary to make change event work after blur event.
    // Can't be done through CSS.
    const stylePaper = {
      borderRadius: '5px'
    };

    return <div className="container">
      <div className="row payment-form">
        <Paper
          className="col s12"
          rounded={false}
          style={stylePaper}
          zDepth={3}
        >
          <OrderSummary cart={this.props.cart} />
          <div className="divider section" />
          <div className="row form-row">

            <div className="col s12 m7 l6">
              <h6>Billing Address</h6>
              <BillAddress
                address={this.state.address}
                errors={this.state.errors}
                processBlur={this.processBlur}
                processChange={this.processChange}
              />
            </div>

            <div className="col s12 m5 l6 section">
              <h6>Credit Card Details</h6>
              <SquareForm />
            </div>

            <div className="col s12">
              <Checkbox
                label="Different shipping address"
                onCheck={this.handleCheck}
                value={this.state.shipping}
              />
              <div className="row" style={this.displayShipping()}>
                <div className="col s12 m7 l6">
                  <h6>Shipping Address</h6>
                  <ShipAddress
                    address={this.state.address}
                    errors={this.state.errors}
                    processBlur={this.processBlur}
                    processChange={this.processChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row form-button-row">
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
        autoHideDuration={3000}
        message={this.state.payFailText}
        onRequestClose={this.handleRequestClose}
        open={this.state.open}
      />
    </div>;
  }
});

export default withRouter(PaymentPage);
