const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You need to add a name"],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, "Price needs to be set"]
  }
});

const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;
