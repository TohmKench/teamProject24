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

// // getUsersByID
// exports.getTeams = function(req,res){

// 	connection.query(`select * from teams`, function(err, rows, fields) {
// 	  if (err) throw err;

// 	  res.send(JSON.stringify(rows));
	  
// 	});
	
// }

// exports.getTeamsA = function(req,res){

// 	connection.query(`SELECT pool , team_name FROM pools where pool = 'A';`, function(err, rows, fields) {
// 	  if (err) throw err;

// 	  res.send(JSON.stringify(rows));
	  
// 	});
	
// }

// exports.getTeamsPool = function(req,res){

// 	connection.query("SELECT pools.pool, teams.id, teams.name FROM teams, pools WHERE teams.name = pools.team_name ORDER BY `teams`.`name` ASC	;", function(err, rows, fields) {
// 	  if (err) throw err;

// 	  res.send(JSON.stringify(rows));
	  
// 	});
	
// }

// exports.getTeamsPool2 = function(req,res){

// 	connection.query("SELECT pools.pool, teams.id, teams.name FROM teams, pools WHERE teams.name = pools.team_name ORDER BY `pools`.`pool` ASC	;", function(err, rows, fields) {
// 	  if (err) throw err;

// 	  res.send(JSON.stringify(rows));
	  
// 	});}

// 	exports.getPlayers = function(req,res){

// 		connection.query("SELECT teams.id as teamID, players.name as playerName, teams.name as teamName FROM `players`, `teams` WHERE teams.id = players.team_id; ", function(err, rows, fields) {
// 		  if (err) throw err;
	
// 		  res.send(JSON.stringify(rows));
		  
// 		});
		
// 	}


// 	exports.getResults = function(req,res){

// 		connection.query(`select * from results ORDER BY date, time`, function(err, rows, fields) {
// 		  if (err) throw err;
	
// 		  res.send(JSON.stringify(rows));
		  
// 		});
		
// 	}

// 	exports.getResultsByTeam = function(req,res){

// 		connection.query(`select * from results ORDER BY date, time`, function(err, rows, fields) {
// 		  if (err) throw err;
	
// 		  res.send(JSON.stringify(rows));
		  
// 		});
		
// 	}

// 	exports.getPlayerStats = function(req,res){

// 		connection.query(`SELECT player_points.player_name, player_points.team_id, player_points.team_name, player_points.points, player_tackles.tackles FROM player_points , player_tackles where player_points.player_id = player_tackles.player_id order by points desc;
// 		`, function(err, rows, fields) {
// 		  if (err) throw err;
	
// 		  res.send(JSON.stringify(rows));
		  
// 		});
		
// 	}

// 	exports.getPools = function(req,res){

// 		connection.query(`select * from pools ORDER BY pool, position asc`, function(err, rows, fields) {
// 		  if (err) throw err;
	
// 		  res.send(JSON.stringify(rows));
		  
// 		});
		
// 	}
	
// 	exports.getPools2 = function(req,res){

// 		connection.query("SELECT DISTINCT pools.team_name, pools.pool, teams.id FROM pools JOIN teams ON pools.team_name = teams.name ORDER BY pools.pool ASC;", function(err, rows, fields) {
// 		  if (err) throw err;
	
// 		  res.send(JSON.stringify(rows));
		  
// 		});
		
// 	}
	
// 	exports.getResults36 = function(req,res){

// 		connection.query("SELECT * FROM `results` where team1_id = '36' || team2_id = '36';", function(err, rows, fields) {
// 		  if (err) throw err;
	
// 		  res.send(JSON.stringify(rows));
		  
// 		});

		
		
// 	}

// 	exports.getUsers = function(req,res){

// 		connection.query("SELECT * FROM `users` ;", function(err, rows, fields) {
// 		  if (err) throw err;
	
// 		  res.send(JSON.stringify(rows));
		  
// 		});
// 	}
	

// deleteCompany
