$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const screenId = urlParams.get('id');

    $.getJSON("http://localhost:3000/screenings/" + screenId, function(data) {
        console.log(data[0].screenId);
        
        $('#screenId').val(data[0].screenId);
        $('#movieId').val(data[0].movieId);
        $('#startTime').val(data[0].startTime);
        $('#endTime').val(data[0].endTime);
        $('#seatsRemaining').val(data[0].seatsRemaining);
        $('#theatreId').val(data[0].theatreId);
    });

    $('#editScreeningForm').submit(function(event) {
        event.preventDefault();

        updateScreening();
    });
});
    function updateScreening() {
        let screenId = $("#screenId").val();
        console.log(screenId);
        let movieId = $("#movieId").val();
        console.log(movieId);
        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let seatsRemaining = $("#seatsRemaining").val();
        let theatreId = $("theatreId").val();
             
        $.post(
            "http://localhost:3000/updateScreening", 
            {
                "screenId": screenId,
                "movieId": movieId,
                "startTime": startTime,
                "endTime": endTime,
                "seatsRemaining": seatsRemaining,
                "theatreId": theatreId
            },
            
            function(response) { 
                console.log("Screen updated successfully"); 
                
                window.location.href="http://localhost:3000/screenings.html";
            }
        );
    }    

    

