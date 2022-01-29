const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
app.use(express.json());

const userRoute = require('./src/routes/users');
const bookRoute = require('./src/routes/contents');
const interactionsRoute = require('./src/routes/interactions');

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users', userRoute);
app.use('/contents', bookRoute);
app.use('/interactions', interactionsRoute);

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    return app.listen(server_port, server_host);
  })
  .then((res) => {
    console.log(`Server is running... ${server_host}:${server_port}`);
  });