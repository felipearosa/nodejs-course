const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'sucess',
    requestedAt: req.requestedTime,
    results: reviews.length,
    data: {
      reviews
    }
  })
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    tour: req.body.tour,
    user: req.body.user
  })

  res.status(201).json({
    status: 'sucess',
    data: {
      review
    }
  })
});
