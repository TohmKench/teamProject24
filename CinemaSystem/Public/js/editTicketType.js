$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const typeId = urlParams.get('id');

    $.getJSON("http://localhost:3000/ticketType/" + typeId, function(data) {
        console.log(data[0].movieId);
        
        $('#typeId').val(data[0].typeId);
        $('#typeName').val(data[0].typeName);
        $('#cost').val(data[0].cost);
    });

    $('#editTicketTypeForm').submit(function(event) {
        event.preventDefault();
        updateTicketType();
});

});
    function updateTicketType() {
        let typeId = $("#typeId").val();
        console.log(typeId);
        let typeName = $("#typeName").val();
        console.log(typeName);
        let cost = $("#cost").val();

             
        $.post(
            "http://localhost:3000/updateTicketType", 
            {
                "typeId": typeId,
                "typeName": typeName,
                "cost": cost,
            },
            
            function(response) { 
                console.log("Ticket Type updated successfully"); 
                
                window.location.href="http://localhost:3000/ticketType.html";
            }
        );
    }    

    

