$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticketId = urlParams.get('id');

    $.getJSON("http://localhost:3000/tickets/" + ticketId, function(data) {
        console.log(data[0].ticketNo);
        
        $('#ticketId').val(data[0].ticketNo);
        $('#bookingId').val(data[0].bookingId);
        $('#screenId').val(data[0].screenId);
        $('#ticketType').val(data[0].ticketType);

    });

    $('#editTicketForm').submit(function(event) {
        event.preventDefault();

        updateTicket();
    });
});
    function updateTicket() {
        let ticketId = $("#ticketId").val();
       // console.log(ticketId);
        let bookingId = $("#bookingId").val();
       // console.log(bookingId);
        let screenId = $("#screenId").val();
        let ticketType = $("#ticketType").val();
console.log(ticketType);
             
        $.post(
            "http://localhost:3000/updateTicket", 
            {
                "ticketId": ticketId,
                "bookingId": bookingId,
                "screenId": screenId,
                "ticketType": ticketType,

            },
            
            function(response) { 
                console.log("Ticket updated successfully"); 
                
                window.location.href="http://localhost:3000/ticket.html";
            }
        );
    }    

    
