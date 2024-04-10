var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var db = require('./model/db');

var app = express();
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/createBooking", function (req, res) {
  db.createBooking(req,res);
     
});

app.get("/movies", function (req, res) {
  db.getMovies(req, res);
});

// Get a specific movie by ID
app.get("/movies/:id", function (req, res) {
  var id = req.params.id;
	db.getMovieById(req, res, id);
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

app.get("/screenings/:id", function (req, res) {
  var id = req.params.id;
  db.getSpecificScreening(req, res, id);
});


// Update a movie
app.post("/createScreening", function (req, res) {
  db.createScreening(req,res);
  //res.send(201);
     
});

app.get("/theatre", function (req, res) {
  db.getTheatre(req, res);
});

app.post("/updateScreening", function (req, res) {
  db.updateScreening(req,res);
  //res.send(201);
     
});

// delete a screening
app.post("/deleteScreening", function (req, res)
{
  db.deleteScreening(req, res);
});


// get Tickets
app.get("/tickets", function (req, res) {
  db.getTickets(req, res);
});

// add Ticket
app.post("/tickets", function(req,res)
{
 db.createTicket(req,res);
});

// Get a specific ticket by ID
app.get("/tickets/:id", function (req, res) {
  var id = req.params.id;
	db.getSpecificTicket(req, res, id);
});


// Update a ticket
app.post("/updateTicket", function (req, res) {
  db.updateTicket(req,res);
  //res.send(201);
     
});

// delete a ticket
app.post("/deleteTicket", function (req, res)
{
  db.deleteTicket(req, res);
});


// ticketType
app.get("/ticketType", function (req, res) {
  db.getTicketType(req, res);
});

// Get a specific ticketType by ID
app.get("/ticketType/:id", function (req, res) {
  var id = req.params.id;
	db.getTicketTypeById(req, res, id);
});

app.post("/ticketType", function(req,res)
{
 db.createTicketType(req,res);
});

// Update a ticketType
app.post("/updateTicketType", function (req, res) {
  db.updateTicketType(req,res);
  //res.send(201);
     
});

// delete a ticketType
app.post("/deleteTicketType", function (req, res)
{
  db.deleteTicketType(req, res);
});

// UI

app.get("/moviesScreens", function(req,res)
{
   db.getMoviesScreens(req,res);
});

// Get screenings for a specific movie
app.get("/movieScreenings/:movieName", function (req, res) {
  var movieName = req.params.movieName; // retrieve movieName from URL parameter
  console.log(movieName);
  db.getSpecificMovieScreenings(req, res, movieName);
});

app.post("/login", function (req, res) {
  db.loginUser(req, res);
});

app.post("/register", function (req, res) {
  db.registerUser(req, res);
});


// Stripe payment

app.get("/payment", function(req, res) {
  res.sendFile(__dirname + '/payment.html');
});



var myServer = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
