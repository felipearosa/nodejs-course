const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    length: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req ,res) => {
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

exports.updateTour = (req ,res) => {
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

exports.deleteTour = (req ,res) => {
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