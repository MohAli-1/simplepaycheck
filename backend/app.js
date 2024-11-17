//The purpose of this file is to handle any request 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users-routes');
const employeeRoutes = require('./routes/employee-routes');
const paystubRoutes = require('./routes/paystub-route'); 
const HttpError = require('./models/http-error');

const app = express();
app.use(bodyParser.json()); 


app.use(bodyParser.json());


app.use('/api/users', usersRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/paystub', paystubRoutes); 

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
.connect('mongodb+srv://simplepaycheck:7m8rrwWexhLUSCA4@cluster0.zj08c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  app.listen(8080);
})
.catch(err => {
  console.log(err);
});


