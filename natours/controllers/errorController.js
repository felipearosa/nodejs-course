const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};


const sendErrorProd = (err, res) => {
  // operational error
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // programming or some other error not leaking error details to user
  } else {
    console.error('ERROR: ', err)

    res.status(500).json({
      status: 'error',
      mesage: 'Something went wrong!'
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development'){
    sendErrorDev(err, res)
  } else {
    sendErrorProd(err, res);
  }

}
