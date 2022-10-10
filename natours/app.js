
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// const res = require('express/lib/response');
// const { redirect } = require('express/lib/response');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
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
