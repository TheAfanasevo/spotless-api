const config = require('config');

/* Json Web Token configuration */
module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  };
};

/* END */