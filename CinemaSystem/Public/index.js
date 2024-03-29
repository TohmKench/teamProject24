var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var db = require('./model/db');

var app = express();
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/movies", function (req, res) {
  db.getMovies(req, res);
});

// Get a specific movie by ID
app.get("/movies/:id", function (req, res) {
  var id = req.params.id;
	db.getSpecificMovie(req, res, id);
});

app.post("/movies", function(req,res)
{
 db.createMovie(req,res);
});

// Update a movie
app.post("/updateMovie", function (req, res) {
  db.updateMovie(req,res);
  //res.send(201);
     
});

// delete a movie
app.post("/deleteMovie", function (req, res)
{
  db.deleteMovie(req, res);
});

app.get("/screenings", function (req, res) {
  db.getScreenings(req, res);
});


// Create a screening
app.post("/createScreening", function (req, res) {
  db.createScreening(req,res);
  //res.send(201);
     
});

// Get a specific screen by ID
app.get("/screenings/:id", function (req, res) {
  var id = req.params.id;
	db.getSpecificScreening(req, res, id);
});

// Update a screening
app.post("/updateScreening", function (req, res) {
  db.updateScreening(req,res);
  //res.send(201);
     
});

var myServer = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
