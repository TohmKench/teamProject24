$(document).ready(function(){

    
    const urlParams = new URLSearchParams(window.location.search);
    const screenId = urlParams.get('screenId');
    console.log(parseInt(screenId));
    
    $.getJSON("http://localhost:3000/screenings/" + screenId, function(data) {
        $('#movie').val(data[0].title);
        console.log(data);
        console.log(data[0]);
        console.log(data[0].startTime); // Corrected property access
            // Splitting datetime string into date and time
        const startTime = new Date(data[0].startTime);
        const startDate = startTime.toISOString().split('T')[0];
        const startTimeStr = startTime.toTimeString().split(' ')[0];
        console.log(startDate);
        console.log(startTimeStr);
            
        $('#date').val(startDate);
        $('#time').val(startTimeStr);
        /*$.post("http://localhost:3000/createBooking", {"bookingDate": startDate, "totalCost": 0, "seats": 0, "emailAddress" : "none"}, function(data){
            console.log(data);
            console.log("Booking created successfully");
        });*/

        $('#bookNowForm').submit(function(event){
            event.preventDefault(); // Prevent the default form submission
    
            // Get form values
            var adultSeats = $('#adult').val();
            var childSeats = $('#child').val();
            var studentSeats = $('#student').val();
            var emailAddress = $('#email').val();
            var adultPrice = 0;
            var childPrice = 0;
            var studentPrice = 0;
            var totalSeats = 0;
            var totalCost = 0;
            var bookingId = 0;
    
            $.getJSON("http://localhost:3000/ticketType" , function(data) {
                console.log(data);
                adultPrice = data[0].cost;
                studentPrice = data[1].cost;
                childPrice = data[2].cost;
                console.log(adultPrice);

                totalSeats = parseInt(adultSeats) + parseInt(childSeats) + parseInt(studentSeats);
                totalCost = (parseInt(adultSeats) * adultPrice) + (parseInt(childSeats) * childPrice) + (parseInt(studentSeats) * studentPrice);
                console.log(totalCost);
                $.post("http://localhost:3000/createBooking", {"bookingDate": startDate, "totalCost": totalCost, "seats": totalSeats, "emailAddress" : emailAddress}, function(data){
                    console.log(data);
                    bookingId = data.bookingId; // Retrieve the bookingId from the response data
                    alert("Booking created successfully with ID: " + bookingId);
                    //window.location.href = "home.html";
                    createTickets(bookingId, ticketTypes);
                });   
            });

            function createTickets(bookingId, ticketTypes) {
                var counter;
                // Iterate through each ticket type and create tickets
                ticketTypes.forEach(function(ticketType) {
                    var quantity = parseInt($('#' + ticketType).val()); // Get the quantity of seats for this ticket type
                    for (var i = 0; i < quantity; i++) {
                        counter++;
                        $.post("http://localhost:3000/createTicket", {"bookingId": bookingId, "screenId": screenId, "ticketType": ticketType}, function(data){
                            console.log(data);
                            console.log("Ticket created successfully");
                        });
                    }
                });
            }
    
        });
    });


});
