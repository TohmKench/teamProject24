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

	var query = "UPDATE screen SET movieId=?, startTime=?, endTime=?, seatsRemaining=? WHERE screenId=?";
	connection.query(query, [movieId, startTime, endTime, seatsRemaining, screenId], function(err, result) {
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
	connection.query(`SELECT screen.*, movie.title FROM screen JOIN movie ON screen.movieId = movie.movieId WHERE screenId = ?`,[id] ,function(err, rows, fields) {
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
        } else {
            // Deleting the screening
            var deleteScreenQuery = "DELETE FROM screen WHERE screenId = ?";
            connection.query(deleteScreenQuery, [screenId], function(screenErr, screenResult) {
                if (screenErr) {
                    console.error("Error deleting screening:", screenErr);
                    res.status(500).send("Error deleting screening");
                } else {
                    console.log("Screening deleted successfully");
                    res.send("Screening deleted successfully");
                }
            });
        }
    });
};


// Ticket
// getTickets
exports.getTickets = function(req,res){

	connection.query("SELECT * FROM ticket", function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
}

// add Ticket
exports.createBooking = function(req, res) {
	  var bookingId = req.body.bookingId;
	  var bookingDate = req.body.bookingDate;
    var totalCost = req.body.totalCost;
    var seats = req.body.seats;
    var emailAddress = req.body.emailAddress;

  
	  var query = "INSERT INTO booking (bookingId, bookingDate, totalCost, seats, emailAddress ) VALUES (?, ?, ?, ?, ?)";
	  connection.query(query, [ bookingId, bookingDate, totalCost, seats, emailAddress], function(err, result) {
	      if (err) throw err;
	      res.send("Booking created successfully");
  	});
};

exports.createTicket = function(req, res) {
	var ticketNo = req.body.ticketNo;
	var bookingId = req.body.bookingId;
	var screenId = req.body.screenId;
	var ticketType = req.body.ticketType;

  
	var query = "INSERT INTO ticket (ticketNo, bookingId, screenId, ticketType) VALUES (?, ?, ?, ?)";
	connection.query(query, [ticketNo, bookingId, screenId, ticketType], function(err, result) {
	  if (err) throw err;
	  res.send("Ticket created successfully");
	});
  };

  
  // UPDATE a ticket
exports.updateTicket = function(req, res) {
	var ticketId = req.body.ticketId;
	//console.log(ticketId);
	var bookingId = req.body.bookingId;
	var screenId = req.body.screenId;
	var ticketType = req.body.ticketType;
console.log(ticketType);
	var query = "UPDATE ticket SET bookingId=?, screenId=?, ticketType=? WHERE ticketNo=?";
	connection.query(query, [bookingId, screenId, ticketType, ticketId], function(err, result) {
		if (err) {
            console.error("Error updating ticket:", err);
            res.status(500).send("Error updating ticket");
        } else {
            console.log("Ticket updated successfully");
            res.send("Ticket updated successfully");
        }
	});
  };
  
   // getSpecificTicket
exports.getSpecificTicket = function(req,res,id ){
	connection.query(`SELECT * FROM ticket WHERE ticketNo = ?`,[id] ,function(err, rows, fields) {
	  if (err) throw err;

	  res.send(JSON.stringify(rows));
	  
	});
	
 }
// deleteTicket
exports.deleteTicket = function(req, res) {
    var ticketId = req.body.ticketId;

    var query = "DELETE FROM ticket WHERE ticketNo = ?";
    connection.query(query, [ticketId], function(err, result) {
        if (err) {
            console.error("Error deleting ticket:", err);
            res.status(500).send("Error deleting ticket");
        } else {
            console.log("Ticket deleted successfully");
            res.send("Ticket deleted successfully");
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

    connection.query("SELECT m.*, s.screenId, s.startTime, s.endTime FROM movie m INNER JOIN screen s ON m.movieId = s.movieId", function(err, rows, fields) {
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

// LOGIN a user
exports.loginUser = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  connection.query("SELECT * FROM `users` WHERE `email` = ?", [email], function(err, rows, fields) {
    if (err) throw err;

    if (rows.length == 0) {
      res.status(400).send('User not found');
    } else {
      var user = rows[0];

      if (password == user.password) {
        res.status(200).send('Login successful');
      } else {
        res.status(400).send('Incorrect password');
      }
    }
  });
}

// REGISTER a user
exports.registerUser = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var userType = req.body.userType;

    connection.query("SELECT * FROM `users` WHERE `email` = ?", [email], function(err, rows, fields) {
        if (err) throw err;

        if (rows.length > 0) {
            res.status(400).send('Email already in use');
        } else {
            connection.query("INSERT INTO `users` (`email`, `password`, `userType`) VALUES ( ?, ?, ?)", [email, password, userType], function(err, results) {
                if (err) {
                    console.error("Error creating user:", err);
                    res.status(500).json({ error: "Error creating user" });
                } else {
                    res.status(200).json({ message: "User created successfully", userId: results.insertId });
                }
            });
        }
    });
};

// getTheatre
exports.getTheatre = function(req, res) {
  connection.query("SELECT * FROM theatre", function(err, rows, fields) {
    if (err) {
      console.error("Error getting theatres:", err);
      res.status(500).send("Error getting theatres");
    } else {
      res.send(JSON.stringify(rows));
    }
  });
};