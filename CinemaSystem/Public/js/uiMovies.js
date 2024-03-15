$("document").ready(function() {

    displayMovies();
    
 });
 
 
 function displayMovies() {
    $.getJSON("http://localhost:3000/moviesScreens", function (data) {
        console.log(data);
        console.log(data.length);
        var output;
        for(var i=0;i < data.length;i++)
        {
            
            output += `<tr>`;
            output += `<td><a href="viewDetails.html?movieId=${data[i].movieId}">${data[i].title}</a></td>`;
            output += `<td>${data[i].language}</td>`;
            output += `<td><button class="btn btn-primary bookNow" data-screen-id(${data[i].screenId})'>Book now</button></td>`; // send screenId for booking and movieId too?
            output += `</tr>`; 
        }

        $("#displayMoviesScreens").append(output);

        $(document).on('click', '.bookNow', function() {
            var screenId = $(this).data('screen-id');
            console.log("Book Now button clicked for screenId: " + screenId);
            window.location.href = "bookNow.html?screenId=" + parseInt(screenId);
        });
      });
 
 }