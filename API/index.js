const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
var passport = require('passport');

// Add connection model
require('./models/connection');
// Add passport config
require('./passport');
// Add env config
require('dotenv').config();

// Add middleware
app.use(cors({
  origin: process.env.UI_URL,
  credentials: true
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())
app.use(passport.initialize());

// Add controllers
var ctrlAuth = require('./controllers/authenticate');
var ctrlPagination = require('./controllers/pagination')

// List routes
app.post('/register',ctrlAuth.register)
app.post('/login', ctrlAuth.login);
app.get('/pageInfo',ctrlPagination);

// Server listening on port mentioned
app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)
})