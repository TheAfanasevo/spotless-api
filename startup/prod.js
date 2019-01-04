/* Dependencies */
const helmet = require('helmet');
const compression = require('compression');

/* Security middleware */
module.exports = function(app) {
  app.use(helmet());
  app.use(compression());
};

/* END */