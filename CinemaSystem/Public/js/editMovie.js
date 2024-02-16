$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('id');

    $.getJSON("http://localhost:3000/movies/" + movieId, function(data) {
        console.log(data[0].movieId);
        
        $('#movieId').val(data[0].movieId);
        $('#title').val(data[0].title);
        $('#language').val(data[0].language);
        $('#releaseDate').val(data[0].releaseDate);
        $('#genre').val(data[0].genre);
        $('#runtime').val(data[0].runtime);
    });

    $('#editMovieForm').submit(function(event) {
        event.preventDefault();

        updateMovie();
    });
});
    function updateMovie() {
        let movieId = $("#movieId").val();
        console.log(movieId);
        let title = $("#title").val();
        console.log(title);
        let language = $("#language").val();
        let releaseDate = $("#releaseDate").val();
        let genre = $("#genre").val();
        let runtime = $("#runtime").val();
             
        $.post(
            "http://localhost:3000/updateMovie", 
            {
                "movieId": movieId,
                "title": title,
                "language": language,
                "releaseDate": releaseDate,
                "genre": genre,
                "runtime": runtime
            },
            
            function(response) { 
                console.log("Movie updated successfully"); 
                
                window.location.href="http://localhost:3000/movies.html";
            }
        );
    }    

    

