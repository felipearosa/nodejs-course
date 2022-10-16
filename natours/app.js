
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// const res = require('express/lib/response');
// const { redirect } = require('express/lib/response');

const app = express();

// GLOBAL MIDDLEWARES
// Set security HTTP Headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests, try again later"
});

app.use('/api', limiter);

// Body parser, read req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization agains NoSQL query injection
app.use(mongoSanitize());

// Data sanitization agains XSS
app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/public`))

// Testing middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers)
  next();
})

// ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Couldn't find path to ${req.originalUrl}.`);
  // err.status = 'fail';
  // err.statusCode = '404';

  next(new AppError(`Couldn't find path to ${req.originalUrl}.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
