const jwt = require('express-jwt'),
      jwks = require('jwks-rsa');

module.exports = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://sarthak-kapoor.au.auth0.com/.well-known/jwks.json'
  }),
  audience: 'Social App api',
  issuer: 'https://sarthak-kapoor.au.auth0.com/',
  algorithms: ['RS256']
});
