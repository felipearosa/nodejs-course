const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => console.log('Database successful'));

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

const Tour = new mongoose.model('Tour', tourSchema)

testTour = new Tour({
  name: "The Park Camper",
  price: 997
});

testTour.save().then(doc => console.log(doc)).catch(err => console.log("Error: ", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port} port...`);
});
