let createError  = require('http-errors');
let express      = require('express');
let path         = require('path');
let cookieParser = require('cookie-parser');
let logger       = require('morgan');
let cors         = require('cors');
let session      = require('express-session');
let MongoStore   = require('connect-mongo')(session);

let config       = require('./config');
let db           = require('./db');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin: config.sharing_host, credentials: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

db.connect((err) => {
	if(err) {
		console.log(err);
	} else {
		console.log("# Connected to MongoDB!");

		const expiresMaxAge = 60000 * 60 * 24 * 14;
		app.use(session({
			secret: config.secret,
			cookie: {
				expires: new Date(Date.now()),
				maxAge: expiresMaxAge,
			},
			store: new MongoStore({ mongooseConnection: db.get() }),
			resave: false,
			saveUninitialized: true
		}));

		bindMiddlewares();
	}

});

let bindMiddlewares = () => {
	app.use(require('./controllers'));

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
};

module.exports = app;
