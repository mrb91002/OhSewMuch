'use strict';

const jwt = require('jsonwebtoken');

const checkAuth = function(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;

  jwt.verify(req.cookies.accessToken, jwtSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.token = decoded;
    next();
  });
};

module.exports = { checkAuth };
