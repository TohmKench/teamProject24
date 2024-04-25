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
           
            $("#screenTheatre").append(`<option value="${data[i].theatreId}" data-capacity="${data[i].capacity}">${data[i].theatreId}</option>`);
        }
    });
 
      
 }       

 function addScreening() {
    let startTime = $("#startTime").val();
    let startDate = $("#startDate").val(); 
    let currentDateTime = new Date();
    let selectedDateTime = new Date(startDate + ' ' + startTime);
    let runtime = $("#movieSelect option:selected").attr('data-runtime');
    let endTime = new Date(new Date(selectedDateTime).getTime() + parseInt(runtime) * 60 * 1000);

    console.log("Start time: ", startTime );
    console.log("Run time: ", parseInt(runtime));
    console.log("End time: ", endTime);
    let seatsRemaining = $("#screenTheatre option:selected").attr('data-capacity');
    let theatreId = $("#screenTheatre").val();
    let movieId = $("#movieSelect").val();
    


    // Checking the startTime if it is in the past
    if (selectedDateTime < currentDateTime) {
        alert("Cannot create a screening in the past.");
        return;
    }

    // Get screenings from db for checking
    $.getJSON("http://localhost:3000/screenings", function(allScreenings) {
        
        let theatreScreenings = allScreenings.filter(function(screening) {
            return screening.theatreId == theatreId;
        });

        // Check if the screen already exists at the same time in the same theatre
        let overlap = theatreScreenings.some(function(existingScreening) {
            let existingStartTime = new Date(existingScreening.startTime);
            let existingEndTime = new Date(existingScreening.endTime);
            return (selectedDateTime >= existingStartTime && selectedDateTime < existingEndTime) ||
                   (existingStartTime >= selectedDateTime && existingStartTime < selectedDateTime);
        });

        // Display an alert
        if (overlap) {
            alert("A screening has already been created for this time in this theatre.");
        } else {
            // Create a screening if no overlapping
            let dateTime = startDate + ' ' + startTime;
            let endDateTime = startDate + ' ' + endTime;

            $.post(
                "http://localhost:3000/createScreening", 
                { 
                    "movieId": movieId, 
                    "startTime": dateTime, 
                    "endTime": endDateTime,
                    "seatsRemaining": seatsRemaining,
                    "theatreId": theatreId
                }, 
                function(data) { 
                    //window.location.href = "http://localhost:3000/screenings.html";
                    console.log("Screening added successfully"); 
                }
            );
        }
    });
}


function editScreening(screenId) {

    window.location.href = "editScreenings.html?id=" + screenId;
    console.log(screenId);

}

function populateDrpDwn() {
    $.getJSON("http://localhost:3000/movies", function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#movieSelect").append(`<option value="${data[i].movieId} " data-runtime=${data[i].runtime} >${data[i].title} (${data[i].runtime} mins)</option>`);
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
