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
// app.get("/teams", function (req, res) {
//   db.getTeams(req, res);
// });


// app.get("/teamsA", function (req, res) {
//   db.getTeamsA(req, res);
// });

// app.get("/teamsPool", function (req, res) {
//   db.getTeamsPool (req, res);
// });

// app.get("/teamsPool2", function (req, res) {
//   db.getTeamsPool2 (req, res);
// });

// app.get("/players", function (req, res) {
//   db.getPlayers (req, res);
// });


// app.get("/results", function (req, res) {
//   db.getResults (req, res);
// });

// app.get("/resultsByTeam", function (req, res) {
//   db.getResultsByTeam (req, res);
// });

// app.get("/playerStats", function (req, res) {
//   db.getPlayerStats (req, res);
// });

// app.get("/pools", function (req, res) {
//   db.getPools (req, res);
// });

// app.get("/pools2", function (req, res) {
//   db.getPools2 (req, res);
// });

// app.get("/results36", function (req, res) {
//   db.getResults36 (req, res);
// });

// app.get("/users", function (req, res) {
//   db.getUsers (req, res);
// });

var myServer = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
