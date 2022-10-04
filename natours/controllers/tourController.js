const Tour = require('./../models/tourModel')

exports.checkBody = (req, res, next) => {
  if(!req.body.data.name || !req.body.data.price){
    return res.status(404).json({
      status: 'error',
      message: 'invalid'
    })
  }
  next();
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    requestedAt: req.requestTime,
    // length: tours.length,
    // data: {
    //   tours
    // }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);

  // if(!tour){
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Tour not found'
  //   });
  // };

  // res.status(200).json({
  //   status: "sucess",
  //   data: {
  //     tour
  //   }
  // })
};

exports.createTour = (req ,res) => {
  res.status(201).json({
    status: "sucess",
    // data: {
    //   tour: newTour
    // }
  })
};

exports.updateTour = (req ,res) => {
  res.status(200).json({
    status: "sucess",
    data: {
      tour: 'updated tour here'
    }
  })
};

exports.deleteTour = (req ,res) => {
  res.status(204).json({
    status: "sucess",
    data: null
  })
};
