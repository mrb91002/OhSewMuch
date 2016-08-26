import React from 'react';

const ThankYouPage = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {

    };
  },

  render() {
    return <div>
      <div className="thanks-clouds">
        <img src="/images/cloud-production-2.png" />
      </div>
      <div className="light-city">
        <img src="/images/lightcity.png" />
      </div>
      <div className="hill2">
        <img src="/images/hill2.png" />
      </div>

      <div className="congratulatons">
        <h1>CONGRATULATIONS</h1>
        <h2>You're awesome and we want your friends to know!</h2>
      </div>

    </div>;

  }
});

export default ThankYouPage;
