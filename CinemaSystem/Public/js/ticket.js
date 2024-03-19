$("document").ready(function() {

    displayTickets();
    populateDrpDwnScreen();
    populateDrpDwnBooking();
    populateDrpDwnTicketType();
 });
 
 
 function displayTickets() {
    $.getJSON("http://localhost:3000/tickets", function (data) {
        console.log(data);
        console.log(data.length);
        var output;
        for(var i=0;i < data.length;i++)
        {
            
            output += `<tr>`;
            output += `<td>${data[i].ticketNo}</td>`;
            output += `<td>${data[i].bookingId}</td>`;
            output += `<td>${data[i].screenId}</td>`;
            output += `<td>${data[i].ticketType}</td>`;
            output += `<td><button class="btn btn-primary" onclick='editTicket(${data[i].ticketNo})'>Edit Ticket</button></td>`;
            output += `<td><button class="btn btn-primary" onclick='deleteTicket(${data[i].ticketNo})'>Delete Ticket</button></td>`;
            output += `</tr>`;   
        }

        $("#displayTickets").append(output);
      });
 
 }

 function populateDrpDwnScreen()
{
    $.getJSON("http://localhost:3000/screenings", function (data) {
        console.log(data);
    for (var i = 0; i < data.length; i++) {
        $("#screenSelect").append("<option>" + data[i].screenId + "</option>");
        
    }
});
}

function populateDrpDwnBooking()
{
    $.getJSON("http://localhost:3000/bookings", function (data) {
        console.log(data);
    for (var i = 0; i < data.length; i++) {
        $("#bookingSelect").append("<option>" + data[i].bookingId + "</option>");
        
    }
});
}

function populateDrpDwnTicketType()
{
    $.getJSON("http://localhost:3000/ticketType", function (data) {
        console.log(data);
    for (var i = 0; i < data.length; i++) {
        $("#ticketTypeSelect").append("<option>" + data[i].typeName + "</option>");
        
    }
});
}

 function addTicket() {
   // let ticketNo = $("#ticketNo").val();
    let bookingId = $("#bookingId").val();
    let screenId = $("#screenId").val(); 
    let ticketType = $("#ticketType").val(); 


    $.post(
        "http://localhost:3000/tickets", 
        { "bookingId": bookingId, "screenId": screenId, "ticketType": ticketType }, // Data to send in the request
        function(data) { 
            window.location.href="http://localhost:3000/ticket.html";
            console.log("Ticket added successfully"); 
            
        }
    );
}

function editTicket(ticketId) {

    window.location.href = "editTicket.html?id=" + ticketId;
    console.log(ticketId);

}

function deleteTicket(ticketId) {
    if (confirm("Are you sure you want to delete this ticket?")) {
        $.post(
            "http://localhost:3000/deleteTicket",
            {"ticketId":ticketId},
            function(response) {
                alert("Ticket deleted successfully");
                window.location.href="http://localhost:3000/ticket.html";
            }
        );
    }
}

