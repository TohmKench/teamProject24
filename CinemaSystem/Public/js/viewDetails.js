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
            $("#head").append('<img src="'+item.imageLink+'" alt="movie poster" style="float: left; margin-right: 20px;" width="200" height="300">');
            $("#details").append('<li class="list-group-item">Language: ' + item.language + '<span id="language"></span></li>' +
            '<li class="list-group-item">Release Date: ' + item.releaseDate + '<span id="releaseDate"></span></li>' +
            '<li class="list-group-item">Genre: ' + item.genre + '<span id="genre"></span></li>' +
            '<li class="list-group-item">Runtime: ' + item.runtime + '<span id="runtime"></span></li>');
            $("#trailer").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + getYouTubeID(item.trailerLink) + '" frameborder="0" allowfullscreen></iframe>');

        });
    });

    function getYouTubeID(url) {
        // Split the URL by '/'
        var parts = url.split('/');
        // Get the last part of the URL (after the last '/')
        var lastPart = parts[parts.length - 1];
        // Split the last part by '?' to remove any query parameters
        var id = lastPart.split('?')[0];
        return id;
    }
        
});
