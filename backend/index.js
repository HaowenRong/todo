
// express
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const routes = require('./routes/postRoutes');

require('dotenv').config();
const uri = process.env.MONGO_DB_URI;

const connection = async () => {
  try {
    connect = await mongoose.connect(uri);
    console.log(`Connected to MongoDB: ${connect.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connection();

app.use(express.static('public'));
app.use(routes);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/routes/postRoutes.js`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
