const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// routes
const routes = require('./routes.js');

dotenv.config();

// db config
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app & middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

// listen
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`listenning on ${port}`);
});
