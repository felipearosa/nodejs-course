
const express = require('express');
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
// const res = require('express/lib/response');
// const { redirect } = require('express/lib/response');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

// ROUTE HANDLERS


const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not implemented yet'
  })
};


// ROUTES

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port} port...`);
});
