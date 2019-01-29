/* App dependencies */
const express = require('express');
const app = express();
/* Third-party packages */
const winston = require('winston');

/* App requirements */
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

/* Public Folder */
app.use(express.static('public'));

/* TEMPLATE ENGINE */
app.set('view engine', 'pug');

/* ROUTERS */
/* GET ROUTERS for main page */
app.get('/', (req, res) => {
    res.render('index');
});

/* SERVER INITIATION */
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

/* Exports */
module.exports = server;

/* END */