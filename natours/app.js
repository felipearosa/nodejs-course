const fs = require('fs')
const express = require('express');
const morgan = require('morgan')
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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


// ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    length: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  if(!tour){
    return res.status(404).json({
      status: 'failed',
      message: 'Tour not found'
    });
  };

  res.status(200).json({
    status: "sucess",
    data: {
      tour
    }
  })
};

const createTour = (req ,res) => {
  const newId = tours[tours.length - 1].id + 1;
  console.log(newId)
  const newTour = Object.assign( { id: newId }, req.body);
  console.log(newTour)

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: "sucess",
      data: {
        tour: newTour
      }
    })
  })
};

const updateTour = (req ,res) => {
  if(req.params.id * 1 > tours.length){
    return res.json({
      status: "failed",
      message: "invalid id"
    })
  }

  res.status(200).json({
    status: "sucess",
    data: {
      tour: 'updated tour here'
    }
  })
};

const deleteTour = (req ,res) => {
  if(req.params.id * 1 > tours.length){
    return res.json({
      status: "failed",
      message: "invalid id"
    })
  }

  res.status(204).json({
    status: "sucess",
    data: null
  })
};


// ROUTES
app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id', getTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port} port...`);
});
