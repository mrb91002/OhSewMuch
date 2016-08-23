import React from 'react';

const NotFound = React.createClass({
  render() {
    return <div className="container">
      <div className="center">
        <br />
        <h1>404 Not Found</h1>
        <br />
        <h3>The page you requested is not available in our system.</h3>
      </div>
    </div>;
  }
});

export default NotFound;
