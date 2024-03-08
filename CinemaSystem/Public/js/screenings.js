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

        $("#displayScreenings").append(output);
      });
      
      $.getJSON("http://localhost:3000/screenings", function (data) {
        
        for (var i = 0; i < data.length; i++) {
          //  $("#movieSelect").append("<option>" + data[i].title + "</option>");
            $("#screenSelect").append("<option>" + data[i].screenId + "</option>");
            
        }

    });
      
 }

 function addScreening() {
    let startTime = $("#startTime").val();
    let startDate = $("#startDate").val(); 
   // let screenId = $("#screenId").val(); 
    let seatsRemaining = $("#seatsRemaining").val(); 
    let theatreId = $("#theatreId").val(); 
    let endTime = "2024-02-10T21:55:00.000Z"; 
    let movieId = $("#movieId").val();

    let dateTime = startDate + " " + startTime;

  
    
    $.post(
        "http://localhost:3000/createScreening", 
        { "movieId": movieId, "startTime": dateTime, "seatsRemaining": seatsRemaining, "theatreId": theatreId, "endTime":endTime }, // Use formattedDateTime
        function(data) { 
            window.location.href="http://localhost:3000/screenings.html";
            console.log("Screening added successfully"); 
        }
    );
}


function populateDrpDwn()
{
   // window.location.href = "createScreenings.html" ;  
    $.getJSON("http://localhost:3000/movies", function (data) {
        console.log(data);
    for (var i = 0; i < data.length; i++) {
        $("#movieSelect").append("<option>" + data[i].title + "</option>");
       // $("#screenSelect").append("<option>" + data[i].screenId + "</option>");
        
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



