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
            $("#screenTheatre").append(`<option value="${data[i].theatreId}">${data[i].theatreId}</option>`);
        }
    });
}

function updateScreening() {
    let screenId = $("#screenId").val();
    let movieId = $("#movieSelect").val();
    let startTime = $("#startTime").val();
    let startDate = $("#startDate").val();
    let theatreId = $("#screenTheatre").val();

    let dateTime = startDate + ' ' + startTime;

    $.post(
        "http://localhost:3000/updateScreening",
        {
            "screenId": screenId,
            "movieId": movieId,
            "startTime": dateTime,
            "theatreId": theatreId
        },
        function(response) { 
            console.log("Screening updated successfully"); 
            window.location.href="http://localhost:3000/screenings.html";
        }
    );
}
