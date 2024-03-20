$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    console.log(movieId);

    $.get("http://localhost:3000/movies/"+movieId, function(data){
        
        // Parse the JSON data
        var movie = JSON.parse(data);
        console.log(movie);
        movie.forEach(function(item) {
            $("#head").append(item.title); 
            $("#details").append('<tr><td>' + item.language + 
            '</td><td>' + item.releaseDate + '</td><td>' + item.genre + '</td><td>' + item.runtime + '</td></tr>');
        });
    });
        
});
