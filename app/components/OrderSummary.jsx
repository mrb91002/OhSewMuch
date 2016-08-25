import { Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import React from 'react';
import weakKey from 'weak-key';

const OrderSummary = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  total() {
    return this.props.cart.reduce((accum, item) => {
      return accum + item.quantity * item.product.price;
    }, 0);
  },

  render() {
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

    return <div>
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
        <TableBody displayRowCheckbox={false} showRowHover={true}>
          {this.props.cart.map((item) => {
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
          <TableRow>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn> {/* style={{ textAlign: 'right' }} */}
              Total:
            </TableRowColumn>
            <TableRowColumn>${this.total().toFixed(2)}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>;
  }

});

export default OrderSummary;
