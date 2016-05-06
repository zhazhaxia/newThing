var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//定义路由
var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var add_activity = require('./routes/add_activity');
var myLaunch = require('./routes/myLaunch');
var activity_detail = require('./routes/activity_detail');
var add_comment = require('./routes/add_comment');
var join_activity = require('./routes/join_activity');
var around = require('./routes/around');
var get_activity_type = require('./routes/get_activity_type');
var get_comment = require('./routes/get_comment');
var get_join_info = require('./routes/get_join_info');
var get_my_join = require('./routes/get_my_join');
var modify_message = require('./routes/modify_message');
var add_posts = require('./routes/add_posts');
var get_posts = require('./routes/get_posts');
var add_posts_comment = require('./routes/add_posts_comment');
var deleteActivity = require('./routes/deleteActivity');
var isView = require('./routes/isView');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置路由
app.use('/index', index);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/add_activity', add_activity);
app.use('/myLaunch', myLaunch);
app.use('/activity_detail', activity_detail);
app.use('/add_comment', add_comment);
app.use('/join_activity', join_activity);
app.use('/around', around);
app.use('/get_activity_type', get_activity_type);
app.use('/get_comment', get_comment);
app.use('/get_join_info', get_join_info);
app.use('/get_my_join', get_my_join);
app.use('/modify_message', modify_message);
app.use('/add_posts', add_posts);
app.use('/get_posts', get_posts);
app.use('/add_posts_comment', add_posts_comment);
app.use('/deleteActivity', deleteActivity);
app.use('/isView', isView);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

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
