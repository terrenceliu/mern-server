const PORT = process.env.PORT || 8000

// Library
var express = require('express');
var db = require('./db');
var cors = require('cors');

var Request = require('./models/request');

var requestController = require('./controllers/request-controller');

app = express();

// Middlewares
app.use(cors());
app.use('/api/req', requestController);

// Routers
app.get('/', function (req, res) {
  console.log("Hit / dir.");
  res.status(200).send("Hello, World.");
})

app.listen(PORT, function () {
  console.log('Server listens on port ' + port);
})