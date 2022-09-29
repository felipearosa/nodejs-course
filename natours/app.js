const fs = require('fs')
const express = require('express');
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');

const app = express();
app.use(express.json());
// app.get('/', (req,res) => {
//   res.status(200).json({ message: "hello from the server side!", app: "Natours" });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'sucess',
    length: tours.length,
    data: {
      tours
    }
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req ,res) => {
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
});

app.patch('/api/v1/tours/:id', (req ,res) => {
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
});

app.delete('/api/v1/tours/:id', (req ,res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port} port...`);
});
