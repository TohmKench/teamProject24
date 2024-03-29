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
            output += `<td>${data[i].theatreId}</td>`;
            output += `<td>${data[i].seatsRemaining}</td>`;
            output += `<td><button class="btn btn-primary" onclick='editScreening(${data[i].screenId})'>Edit Screening</button></td>`;
            output += `<td><button class="btn btn-primary" onclick='deleteScreening(${data[i].screenId})'>Delete Screening</button></td>`;
            output += `</tr>`;
        }

        $("#displayScreenings").append(output);
      });
      
      $.getJSON("http://localhost:3000/theatre", function (data) {
        
        for (var i = 0; i < data.length; i++) {
           
            $("#screenTheatre").append(`<option value= ${data[i].capacity} >  ${data[i].theatreId}  </option>`);
        }
    });
 
      
 }       

 function addScreening() {
    let startTime = $("#startTime").val();
    let startDate = $("#startDate").val(); 
    let screenId = $("#screenId").val();
    let seatsRemaining = $("#screenTheatre").val(); 
    let theatreId = $("#screenTheatre option:selected").text(); 
    let endTime = "2024-02-10T21:55:00.000Z"; 
    let movieId = $("#movieSelect").val();
    let dateTime = startDate + " " + startTime;    
    
    console.log(seatsRemaining);
    console.log(theatreId);
    
    
    $.post(
        "http://localhost:3000/createScreening", 
        { "screenId": screenId, "movieId": movieId, "startTime": dateTime, "seatsRemaining": seatsRemaining, "theatreId": theatreId, "endTime":endTime }, // Use formattedDateTime
        function(data) { 
            window.location.href="http://localhost:3000/screenings.html";
            console.log("Screening added successfully"); 
        }
    );
}


function editScreening(screenId) {

    window.location.href = "editScreenings.html?id=" + screenId;
    console.log(screenId);

}

function populateDrpDwn() {
    $.getJSON("http://localhost:3000/movies", function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#movieSelect").append(`<option value="${data[i].movieId}">${data[i].title}</option>`);
        }
    });
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
