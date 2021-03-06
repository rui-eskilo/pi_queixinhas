var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('express-session')({ secret: 'canyoukeepasecretpressonetoyesandtwotono', resave: false, saveUninitialized: true }));
app.use(require('passport').initialize());
app.use(require('passport').session());
var login = require('./login')(app);
var routes = require('./routes/index.js');
var about = require('./routes/details/about')(app);
var contact = require('./routes/details/contact')(app);
var queixinhas = require('./routes/queixinhas')(app);
var commentary = require('./routes/commentary')(app);
var dashboard = require('./routes/dashboard')(app);
var forgot_password = require('./routes/user/forgot_password')(app);
var vote = require('./routes/vote')(app);
var register = require('./routes/register')(app);

app.use('/', routes);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
