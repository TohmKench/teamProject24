$("document").ready(function() {

    displayScreenings();
    populateDrpDwn();
 });
 
 
 function displayScreenings() {
    $.getJSON("http://localhost:3000/screenings", function (data) {
        console.log(data);
        console.log(data.length);
        var output;
        for(var i=0;i < data.length;i++)
        {
            var startTime = new Date(data[i].startTime);
            var startDate = startTime.toDateString();
            var startTimeString = startTime.toLocaleTimeString();

            output += `<tr>`;
            output += `<td>${i + 1}</td>`;
            output += `<td>${data[i].title}</td>`;
            output += `<td>${startTimeString}</td>`;
            output += `<td>${startDate}</td>`;
            output += `<td>${data[i].screenId}</td>`;
            output += `<td>${data[i].seatsRemaining}</td>`;
            output += `<td><button class="btn btn-primary" onclick='editScreening(${data[i].screenId})'>Edit Screening</button></td>`;
            output += `<td><button class="btn btn-primary" onclick='deleteScreening(${data[i].screenId})'>Delete Screening</button></td>`;
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

function populateDrpDwn()
{

    $.getJSON("http://localhost:3000/movies", function (data) {
        console.log(data);
    for (var i = 0; i < data.length; i++) {
        $("#movieSelect").append("<option>" + data[i].title + "</option>");
        
    }
});
}

function editScreening(screenId) {

    window.location.href = "editScreening.html?id=" + screenId;
    console.log(screenId);
}

function deleteScreening(screenId) {
    if (confirm("Are you sure you want to delete this screen?")) {
        $.post(
            "http://localhost:3000/deleteScreening",
            {"screenId":screenId},
            function(response) {
                alert("Screen deleted successfully");
                window.location.href="http://localhost:3000/screenings.html";
            }
        );
    }
}