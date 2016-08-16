import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const App = React.createClass({
  handleTouchTap(event) {
    console.log(event.target);
  },

  render() {
    // console.log(getMuiTheme());
    return <div>
    <AppBar
      onTouchTap={this.handleTouchTap}
      title="Oh Sew Much"
    />
      <h1>
        Hello world
      </h1>
    </div>;
  }
});



export default App;
