var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var statusRouter = require('./routes/status');
var imagesRouter = require('./routes/images');
const jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.urlencoded({ extended: true , limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw());
const port = 3101;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//auth middleware
app.use(function(req, res, next) {
  if(req.url.indexOf('/api/user/')==0 || req.url.indexOf('/api/images/')==0){
    next()
  }else{
    verifyToken(req, res, next)
  }
});

app.use('/api/user', userRouter);
app.use('/api/status', statusRouter);
app.use('/api/images', imagesRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err)
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.send({ error: err.message });
});

module.exports = app;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-auth-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, 'mysecret');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};