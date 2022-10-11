const mongoose = require('mongoose');
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


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port} port...`);
});

process.on('unhandledRejection', err => {
  console.log('name: ', err.name);
  console.log('message:', err.message);
  console.log('UNHANDLED REJECTION! Shutting Down....');
  server.close(() => {
    process.exit(1);
  })
});
