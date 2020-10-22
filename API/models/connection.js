const mongoose = require('mongoose');
const { databaseConfig } = require('../data_helpers/constants')

// Database configurations
var options = {
  dbName: databaseConfig.databaseName,
  user: databaseConfig.userName,
  pass: databaseConfig.password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

// connect to database
mongoose.connect(databaseConfig.uri, options);

// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + databaseConfig.uri);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Add User Model
require('./users');
