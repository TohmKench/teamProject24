var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cinemabookingsystem'
});

connection.connect(function(err){
	if(err) throw err;
	console.log(`Sucessfully connected to MySQL database cinemabookingsystem`);
});


// getMovies
exports.getMovies = function(req,res){

	connection.query("SELECT * FROM `movie` ", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

// CREATE a movie
exports.createMovie = function(req, res) {
	var movieId = req.body.movieId;
	var title = req.body.title;
	var language = req.body.language;
	var releaseDate = req.body.releaseDate;
	var genre = req.body.genre;
	var runtime = req.body.runtime;
  
	var query = "INSERT INTO movie (movieId, title, language, releaseDate, genre, runtime) VALUES (?, ?, ?, ?, ?, ?)";
	connection.query(query, [movieId, title, language, releaseDate, genre, runtime], function(err, result) {
	  if (err) throw err;
	  res.send("Movie created successfully");
	});
  };

  // UPDATE a movie
exports.updateMovie = function(req, res) {
	var movieId = req.body.movieId;
	var title = req.body.title;
	var language = req.body.language;
	var releaseDate = req.body.releaseDate;
	var genre = req.body.genre;
    var runtime = req.body.runtime;
	var query = "UPDATE movie SET title=?, language=?, releaseDate=?, genre=?, runtime=? WHERE movieId=?";
	connection.query(query, [title, language, releaseDate, genre, runtime, movieId], function(err, result) {
		if (err) {
            console.error("Error updating movie:", err);
            res.status(500).send("Error updating movie");
        } else {
            console.log("Movie updated successfully");
            res.send("Movie updated successfully");
        }
	});
  };
  
   // getSpecificMovie
exports.getSpecificMovie = function(req,res,id ){
	connection.query(`SELECT movieId, title, language, releaseDate, genre, runtime FROM movie WHERE movieId = ?`,[id] ,function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
 }
// deleteMovie
exports.deleteMovie = function(req, res) {
    var movieId = req.body.movieId;

    var query = "DELETE FROM movie WHERE movieId = ?";
    connection.query(query, [movieId], function(err, result) {
        if (err) {
            console.error("Error deleting movie:", err);
            res.status(500).send("Error deleting movie");
        } else {
            console.log("Movie deleted successfully");
            res.send("Movie deleted successfully");
        }
    });
};

// getScreenings
exports.getScreenings = function(req,res){

	connection.query("SELECT * FROM `screen` ", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

// CREATE a Screening
exports.createScreening = function(req, res) {
	var movieId = req.body.movieId;
	var startTime = req.body.title;
	var endTime = req.body.language;
	var theatreId = req.body.releaseDate;
	var viewingId = req.body.genre;

	var query = "INSERT INTO screen (movieId, startTime, endTime, theatreId, viewingId) VALUES (?, ?, ?, ?, ?)";
	connection.query(query, [movieId, startTime, endTime, theatreId, viewingId], function(err, result) {
	  if (err) throw err;
	  res.send("Screening created successfully");
	});
  };


    // UPDATE a screening
exports.updateScreening = function(req, res) {
	var movieId = req.body.movieId;
	var startTime = req.body.title;
	var endTime = req.body.language;
	var theatreId = req.body.releaseDate;
	var viewingId = req.body.genre;
	var query = "UPDATE movie SET startTime=?, endTime=?, theatreId=?, movieId=? WHERE viewingID=?";
	connection.query(query, [movieId, startTime, endTime, theatreId, viewingId], function(err, result) {
		if (err) {
            console.error("Error updating screening:", err);
            res.status(500).send("Error updating screening");
        } else {
            console.log("Screening updated successfully");
            res.send("Screening updated successfully");
        }
	});
  };

  // deleteScreening
exports.deleteScreening = function(req, res) {
    var movieId = req.body.movieId;

    var query = "DELETE FROM screening WHERE viewingId = ?";
    connection.query(query, [viewingId], function(err, result) {
        if (err) {
            console.error("Error deleting screening:", err);
            res.status(500).send("Error deleting screening");
        } else {
            console.log("Screening deleted successfully");
            res.send("Screening deleted successfully");
        }
    });
};