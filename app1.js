var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionRouter = require('./router/sessionModule.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


app.get('/',()=>{
	res.send('adf')
})
//  /\/user\?(.*)/
app.get(/\/user\?(.*?)/,async (req,res)=>{
	console.log('adfasdf')
	let strSql = 'select * from fortest limit 0,4'
	let result = await sqlQuery(strSql)
	resJson = JSON.stringify(Array.from(result))
	console.log(resJson)
	res.send(resJson)
	res.json(Array.from(result))
})
app.get('book/:bookid',(req,res)=>{
	let bookid = req.params.bookid
})

module.exports = app;
