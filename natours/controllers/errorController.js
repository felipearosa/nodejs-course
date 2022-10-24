const AppError = require('./../utils/appError')

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Type some other name`;

  return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
  const value = Object.values(err.errors).map(el => el.message);
  const message = value.join('. ')

  return new AppError(message, 400);
}

const handleTokenError = () => new AppError('Invalid Token. Login Again!', 401)
const handleTokenExpired = () => new AppError('Expired Token. Login Again!', 401)

const sendErrorDev = (err, req, res) => {
  if(req.originalUrl.startsWith('/api')){
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  })
};


const sendErrorProd = (err, req, res) => {
  if(req.originalUrl.startsWith('/api')){
    // operational error
    if(err.isOperational){
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });

      // programming or some other error not leaking error details to user
    }

    console.error('ERROR: ', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    })
  }

  if(err.isOperational){
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    })

    // programming or some other error not leaking error details to user
  }
  console.error('ERROR: ', err);

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later!'
  });

}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development'){
    sendErrorDev(err, req, res)
  } else if (process.env.NODE_ENV === 'production'){
    let error = Object.assign(err);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);
    if(error.name === 'JsonWebTokenError') error = handleTokenError();
    if(error.name === 'TokenExpiredError') error = handleTokenExpired();

    sendErrorProd(error, req, res);
  }

}
