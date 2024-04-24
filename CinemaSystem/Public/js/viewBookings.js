$(document).ready(function(){
    const userEmail = localStorage.getItem('email');
    console.log(userEmail);
    
    
    $.getJSON("http://localhost:3000/booking/" + userEmail, function(data) {
        console.log(data);
        
        // Iterate over each ticket in the data
        data.forEach(function(ticket) {
            // Create a new card for each ticket
            $("#contain").append(`<div class="card" style="width: 600px; padding-bottom: 20px;">
                <div class="card-header" id="cardhead_${ticket.ticketNo}"></div>
                <div class="card-body" id="cardbody_${ticket.ticketNo}">
                    <h5 id="card-title_${ticket.ticketNo}"></h5>
                    <p id="card-text_${ticket.ticketNo}"></p>
                    
                </div>
            </div>`);
            
            // Dynamically populate each card with ticket information
            $(`#cardhead_${ticket.ticketNo}`).append(ticket.title);
            $(`#cardbody_${ticket.ticketNo}`).append("Ticket Number: "+ ticket.ticketNo+"<br>");
            $(`#cardbody_${ticket.ticketNo}`).append("Time: "+ ticket.startTime+"<br>");
            $(`#cardbody_${ticket.ticketNo}`).append("Theatre: "+ ticket.theatreId+"<br>");
            $(`#cardbody_${ticket.ticketNo}`).append("Ticket Type: "+ ticket.ticketType+"<br>");
            $(`#cardbody_${ticket.ticketNo}`).prepend(`<img src="${ticket.imageLink}" style="max-width: 35%; height: auto; float: right;"><br>`);
        });
    });
});
