$("document").ready(function() {

    displayScreenings();
    
 });
 
 
 function displayScreenings() {
    $.getJSON("http://localhost:3000/screenings", function (data) {
        console.log(data);
        console.log(data.length);
        var output;
        for(var i=0;i < data.length;i++)
        {
            
            output += `<tr>`;
            output += `<td>${i+1}</td>`;
            output += `<td>${data[i].title}</td>`;
            output += `<td>${data[i].language}</td>`;
            output += `<td>${data[i].releaseDate}</td>`;
            output += `<td><button class="btn btn-primary" onclick='editMovie(${data[i].movieId})'>Edit Movie</button></td>`;
            output += `<td><button class="btn btn-primary" onclick='deleteMovie(${data[i].movieId})'>Delete Movie</button></td>`;
            output += `</tr>`;   
        }

        $("#displayMovies").append(output);
      });
 
 }

 function addMovie() {
    let movieId = $("#movieId").val();
    let title = $("#title").val();
    let language = $("#language").val(); 
    let releaseDate = $("#releaseDate").val(); 
    let genre = $("#genre").val();
    let runtime = $("#runtime").val();

    $.post(
        "http://localhost:3000/movies", 
        { "movieId": movieId, "title": title, "language": language, "releaseDate": releaseDate, "genre": genre, "runtime": runtime }, // Data to send in the request
        function(data) { 
            window.location.href="http://localhost:3000/movies.html";
            console.log("Movie added successfully"); 
            
        }
    );
}

function editMovie(movieId) {

    window.location.href = "editMovie.html?id=" + movieId;
    console.log(movieId);

}

function deleteMovie(movieId) {
    if (confirm("Are you sure you want to delete this movie?")) {
        $.post(
            "http://localhost:3000/deleteMovie",
            {"movieId":movieId},
            function(response) {
                alert("Movie deleted successfully");
                window.location.href="http://localhost:3000/movies.html";
            }
        );
    }
}

