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

      <div className="congratulations">
        <h2>CONGRATULATIONS</h2>
        <h5>You're awesome and we want your friends to know!</h5>

        <div className="col s12 thanks-message">
          <img src="/images/facebook.png" width="65" />
          <img src="/images/twitter.png" width="65" />
          <img src="/images/instagram.png" width="65" />
          <img src="/images/pinterest.png" width="65" />
          <img src="/images/tumblr.png" width="65" />
        </div>

      </div>


      <footer>
        {/* <p> */}
          Web Design by - Team Super Secret Squirrel
        {/* </p> */}
      </footer>

    </div>

  }
});

export default ThankYouPage;
