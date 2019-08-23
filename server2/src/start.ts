import express from "express";
import path from 'path';
// import dotenv from 'dotenv';
import cors from 'cors';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import loggerDev from 'morgan';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import { config } from './config';
import { DB } from './db';

import logger from './helpers/logger';

// dotenv.config();

const app = express();
const port = 3000; // default port to listen
const MongoStore = connectMongo(session);
const db         = new DB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin: config.sharing_host, credentials: true}));

app.use(loggerDev('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.connect((err: any) => {
	if(err) {
		logger.error(err);
	} else {
		logger.info("# Connected to MongoDB!");

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

		app.use(require('./controllers'));
	}
});

// start the Express server
app.listen(port, () => {
    // console.log( `server started at http://localhost:${ port }` );
    logger.info("Server is started at http://localhost:" + port);
});