$(document).ready(function() {
    populateDropdowns();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const screenId = urlParams.get('id');

    $.getJSON("http://localhost:3000/screenings/" + screenId, function(data) {
        $('#screenId').val(data[0].screenId);
        $('#movieSelect').val(data[0].movieId);
        $('#startTime').val(data[0].startTime);
        $('#startDate').val(data[0].startDate);
        $('#screenTheatre').val(data[0].theatreId);
    });

    $('#addScreeningForm').submit(function(event) {
        event.preventDefault();
        updateScreening();
    });
});

function populateDropdowns() {
    $.getJSON("http://localhost:3000/movies", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#movieSelect").append(`<option value="${data[i].movieId}">${data[i].title}</option>`);
        }
    });

    $.getJSON("http://localhost:3000/theatre", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#screenTheatre").append(`<option value="${data[i].theatreId}" data-capacity="${data[i].capacity}">${data[i].theatreId}</option>`);
        }
    });
}

function updateScreening() {


    $.getJSON("http://localhost:3000/theatre", function (data) {
        
    for (var i = 0; i < data.length; i++) {
       
        $("#screenTheatre").append(`<option value= ${data[i].capacity} >  ${data[i].theatreId}  </option>`);
    }
});
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    let screenId = urlParams.get('id');
    let movieId = $("#movieSelect").val();
    let startTime = $("#startTime").val();
    let startDate = $("#startDate").val();
    let theatreId = $("#screenTheatre option:selected").text(); 

    let seatsRemaining = $("#screenTheatre option:selected").data('capacity'); 

    let dateTime = startDate + ' ' + startTime;


    console.log(screenId);
    console.log(movieId);
    console.log(startTime);
    console.log(startDate);
    console.log(theatreId);
    console.log(dateTime);

    $.post(
        "http://localhost:3000/updateScreening",
        {
            "screenId": screenId,
            "movieId": movieId,
            "startTime": dateTime,
            "theatreId": theatreId,
            "seatsRemaining": seatsRemaining
        },
        function(response) { 
            console.log("Screening updated successfully"); 
            window.location.href="http://localhost:3000/screenings.html";
        }
    );
}
