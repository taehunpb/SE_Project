var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var joinForm = require('./routes/joinForm');
var login = require('./routes/login');
var user = require('./routes/user');
var admin = require('./routes/admin');
var seller = require('./routes/seller');
var proregi = require('./routes/proregi');
var userinfo = require('./routes/userinfo');
var statistic = require('./routes/statistic');
var mypage = require('./routes/mypage');
var prolist = require('./routes/prolist');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/login', login);
app.use('/user', user);
app.use('/admin', admin);
app.use('/seller', seller);
app.use('/proregi', proregi);
app.use('/joinForm',joinForm);
app.use('/statistic',statistic);
app.use('/userinfo',userinfo);
app.use('/mypage',mypage);
app.use('/prolist', prolist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


app.use('/', express.static(__dirname + '/www')); 
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap