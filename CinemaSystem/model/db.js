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
exports.getMovieById = function(req,res,id ){
  connection.query(`SELECT * FROM movie WHERE movieId = ?`,[id] ,function(err, rows, fields) {
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

  connection.query("SELECT screen.*, movie.title FROM screen JOIN movie ON screen.movieId = movie.movieId", function(err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
    
  });
  
}

// CREATE a Screening
exports.createScreening = function(req, res) {
  var movieId = req.body.movieId;
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;
  var theatreId = req.body.theatreId;
  var screenId = req.body.screenId;
  var seatsRemaining = req.body.seatsRemaining;

  var query = "INSERT INTO screen (movieId, startTime, endTime, theatreId, screenId, seatsRemaining) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(query, [movieId, startTime, endTime, theatreId, screenId, seatsRemaining], function(err, result) {
    if (err) throw err;
    res.send("Screening created successfully");
  });
};


// UPDATE a screening
exports.updateScreening = function(req, res) {
  var screenId = req.body.screenId;
  var movieId = req.body.movieId;
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;
  var theatreId = req.body.theatreId;
  var seatsRemaining = req.body.seatsRemaining;

  var query = "UPDATE screen SET movieId=?, startTime=?, endTime=?, seatsRemaining=?, theatreId=? WHERE screenId=?";
  connection.query(query, [movieId, startTime, endTime, seatsRemaining, theatreId, screenId], function(err, result) {
    if (err) {
      console.error("Error updating movie:", err);
      res.status(500).send("Error updating movie");
    } else {
      console.log("Screen updated successfully");
      res.send("Screen updated successfully");
    }
  });
};

// getSpecificScreening
exports.getSpecificScreening = function(req,res,id ){
  connection.query(`SELECT * FROM screen WHERE screenId = ?`,[id] ,function(err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
    
  });
  
}

// deleteScreening
exports.deleteScreening = function(req, res) {
  var screenId = req.body.screenId;

  // Deleting ticket first
  var deleteTicketsQuery = "DELETE FROM ticket WHERE screenId = ?";
  connection.query(deleteTicketsQuery, [screenId], function(ticketErr, ticketResult) {
    if (ticketErr) {
      console.error("Error deleting tickets for screening:", ticketErr);
      res.status(500).send("Error deleting tickets for screening");
    } 
    else {
      // Deleting the screening
      var deleteScreenQuery = "DELETE FROM screen WHERE screenId = ?";
      connection.query(deleteScreenQuery, [screenId], function(screenErr, screenResult) {
        if (screenErr) {
          console.error("Error deleting screening:", screenErr);
          res.status(500).send("Error deleting screening");
        } 
        else {
          console.log("Screening deleted successfully");
          res.send("Screening deleted successfully");
        }
      });
    }
  });
};

// getTicketType
exports.getTicketType = function(req,res){

	connection.query("SELECT * FROM `ticketType` ", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

// CREATE a ticketType
exports.createTicketType = function(req, res) {
	var typeId = req.body.typeId;
	var typeName = req.body.typeName;
	var cost = req.body.cost;
  
	var query = "INSERT INTO ticketType (typeId, typeName, cost) VALUES (?, ?, ?)";
	connection.query(query, [typeId, typeName, cost], function(err, result) {
	  if (err) throw err;
	  res.send("Ticket Type created successfully");
	});
  };

  // UPDATE a ticketType
exports.updateTicketType = function(req, res) {
	var typeId = req.body.typeId;
	var typeName = req.body.typeName;
	var cost = req.body.cost;

	var query = "UPDATE ticketType SET typeName=?, cost=? WHERE typeId=?";
	connection.query(query, [typeName, cost, typeId], function(err, result) {
		if (err) {
            console.error("Error updating Ticket Type:", err);
            res.status(500).send("Error updating Ticket Type");
        } else {
            console.log("Ticket Type updated successfully");
            res.send("Ticket Type updated successfully");
        }
	});
  };
  
   // getSpecificTicketType
exports.getTicketTypeById = function(req,res,id ){
	connection.query(`SELECT * FROM ticketType WHERE typeId = ?`,[id] ,function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
 }
// deleteTicketType
exports.deleteTicketType = function(req, res) {
    var typeId = req.body.typeId;

    var query = "DELETE FROM ticketType WHERE typeId = ?";
    connection.query(query, [typeId], function(err, result) {
        if (err) {
            console.error("Error deleting Ticket Type:", err);
            res.status(500).send("Error deleting Ticket Type");
        } else {
            console.log("Ticket Type deleted successfully");
            res.send("Ticket Type deleted successfully");
        }
    });
};

// Get movie and screen for User 
exports.getMoviesScreens = function(req,res){

  connection.query("SELECT m.*, s.startTime, s.endTime FROM movie m INNER JOIN screen s ON m.movieId = s.movieId", function(err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
    
  });
  
}

// Get specific movie's screenings for second page front end

// getSpecificScreening
exports.getSpecificMovieScreenings = function(req, res, movieName) {
  // console.log(movieName);
  connection.query(`
    SELECT screen.*, movie.title AS movieTitle, movie.runtime AS runTime
    FROM screen 
    INNER JOIN movie ON screen.movieId = movie.movieId 
    WHERE movie.title = ?
  `, [movieName], function(err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
}

exports.getTheatre = function(req,res){

  connection.query("SELECT * FROM `theatre` ", function(err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
    
  });
  
}

exports.createTheatre = function(req, res) {
  // Extract booking details from the request body
  const theatreDetails = req.body;
  
  // Insert the booking details into the 'bookings' table
  connection.query('INSERT INTO theatre SET ?', theatreDetails, function(err, results, fields) {
    if (err) {
      // Handle error if insertion fails
      console.error("Error creating theatre:", err);
      res.status(500).json({ error: "Error creating theatre" });
    } else {
      // If booking is ngeated successfully, send a success response
      res.status(200).json({ message: "Theatre created successfully", TheatreId: results.insertId });
    }
  });
};

exports.editTheatre = function(req, res) {
  // Extract booking details from the request body
  const theatreId = req.params.theatreId;
  const updatedTheatreDetails = req.body;

  // Assuming you have a 'bookings' table in your MySQL database
  // Update the booking details in the 'bookings' table
  connection.query('UPDATE theatre SET ? WHERE theatreId = ?', [updatedTheatreDetails, theatreId], function(err, results, fields) {
    if (err) {
      // Handle error if update fails
      console.error("Error updating theatre:", err);
      res.status(500).json({ error: "Error updating theatre" });
    } else {
      // If booking is updated successfully, send a success response
      res.status(200).json({ message: "Theatre updated successfully" });
    }
  });
};

exports.deleteTheatre = function(req, res) {
  // Extract booking details from the request body
  const theatreId = req.params.theatreId;
  

  // Assuming you have a 'bookings' table in your MySQL database
  // Update the booking details in the 'bookings' table
  connection.query('DELETE FROM theatre WHERE theatreId = ?', [theatreId], function(err, results, fields) {
    if (err) {
      // Handle error if update fails
      console.error("Error deleting theatre:", err);
      res.status(500).json({ error: "Error deleting theatre" });
    } else {
      // If booking is updated successfully, send a success response
      res.status(200).json({ message: "Theatre deleted successfully" });
    }
  });
};


exports.getBooking = function(req,res){

  connection.query("SELECT * FROM `booking` ", function(err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
    
  });
  
}

// Assuming db is your database connection object
exports.createBooking = function(req, res) {
  // Extract booking details from the request body
  const bookingDetails = req.body;
  
  // Insert the booking details into the 'bookings' table
  connection.query('INSERT INTO booking SET ?', bookingDetails, function(err, results, fields) {
    if (err) {
      // Handle error if insertion fails
      console.error("Error creating booking:", err);
      res.status(500).json({ error: "Error creating booking" });
    } else {
      // If booking is ngeated successfully, send a success response
      res.status(200).json({ message: "Booking created successfully", bookingId: results.insertId });
    }
  });
};
