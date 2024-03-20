$("document").ready(function() {

    displayTicketType();
    
 });
 
 
 function displayTicketType() {
    $.getJSON("http://localhost:3000/ticketType", function (data) {
        console.log(data);
        console.log(data.length);
        var output;
        for(var i=0;i < data.length;i++)
        {
           // var movieId = data[i].movieId;
            output += `<tr>`;
            output += `<td>${data[i].typeId}</td>`;
            output += `<td>${data[i].typeName}</td>`;
            output += `<td>${data[i].cost}</td>`;
            output += `<td><button class="btn btn-primary" onclick='editTicketType(${data[i].typeId})'>Edit Ticket Type</button></td>`;
            output += `<td><button class="btn btn-primary" onclick='deleteTicketType(${data[i].typeId})'>Delete Ticket Type</button></td>`;
            output += `</tr>`;   
        }

        $("#displayTicketType").append(output);
      });
 
 }


 function addTicketType() {
    let typeName = $("#name").val(); 
    let cost = $("#cost").val(); 

    $.post(
        "http://localhost:3000/ticketType", 
        { "typeName": typeName, "cost": cost }, // Data to send in request
        function(data) { 
            window.location.href="http://localhost:3000/ticketType.html";
            console.log("Ticket Type added successfully"); 
            
        }
    );
}

function editTicketType(typeId) {

    window.location.href = "editTicketType.html?id=" + typeId;
    console.log(typeId);

}

function deleteTicketType(typeId) {
    if (confirm("Are you sure you want to delete this ticket type?")) {
        $.post(
            "http://localhost:3000/deleteTicketType",
            {"typeId":typeId},
            function(response) {
                alert("Ticket type deleted successfully");
                window.location.href="http://localhost:3000/ticketType.html";
            }
        );
    }
}

