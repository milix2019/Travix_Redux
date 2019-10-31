const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const env = require('dotenv').config();
var expressValidator = require('express-validator');
require('express-validator/check');
require('express-validator/filter');

const logger = require("./helpers/logger");
const noteRoutes = require('./routes/note');

const TAG = "server > ";

if (process.env.NODE === 'production') {
    env.path ='.env.production';
} else {
    env.path = '.env';
}

logger(TAG + 'started');


// Create Express server.
const app = express();

// Express configuration.
app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(require('express-status-monitor')());


app.use(express.json());
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


// CORS (cross origin)
// CORS spec only requires the OPTIONS call to precede the POST or GET 
// if the POST or GET has any non-simple content or headers in it
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method == "OPTIONS") {
        res.writeHead(200);
        res.end();
    } else {
        next();
    }
});


app.get('/', function (req, res, next) {
    res.status(200).send(TAG + "running");
})


// bind the routes to application here
app.use('/api/tasks', noteRoutes);


if (process.env.DEV) {
    app.use(errorHandler());
}


// Start Express server.
app.listen(app.get('port'), function () {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app;
