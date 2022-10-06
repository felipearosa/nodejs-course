const Tour = require('./../models/tourModel')

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(JSON.parse(queryStr));

    const tours = await query;

    res.status(200).json({
      status: 'sucess',
      requestedAt: req.requestTime,
      length: tours.length,
      data: {
        tours
      }
    });
  } catch (err){
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.getTour = async (req, res) => {
  try{
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "sucess",
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req ,res) => {
  try{
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "sucess",
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.updateTour = async (req ,res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "sucess",
      data: {
        tour
      }
    });
  } catch (err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req ,res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: "sucess",
      data: null
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
