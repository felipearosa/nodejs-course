const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    require: [true, 'Review must have text!']
  },
  rating: {
    type: Number,
    max: [5, 'Max rating is 5'],
    min: [1, 'Max rating is 1']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour']
  },
  user:
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.statics.calcAvgRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1},
        avgRating: { $avg: '$rating' }
      }
    }
  ])

  await Tour.findByIdAndUpdate(tourId, {
    ratingsAverage: stats[0].avgRating,
    ratingQuantity: stats[0].nRatings
  })
}

reviewSchema.post('save', function() {
  this.constructor.calcAvgRatings(this.tour)
})

reviewSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select: 'name photo'
  })

  next();
})


const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
