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
        var currentSeats = parseInt(data[0].seatsRemaining);
        console.log(currentSeats);
        $.getJSON("http://localhost:3000/ticketType" , function(data) {
            ticketData = data;
            console.log(data);
            data.forEach(function(ticketType) {
                $('#ticketTypes').append('<div class="form-group"><label for="' + ticketType.typeName + '">' + ticketType.typeName + '</label><input type="number" class="form-control ticket-quantity" data-cost="' + ticketType.cost + '" id="' + ticketType.ticketType + '" min="0" value="0"></div>');
            });
        });

        $('#bookNowForm').submit(function(event){
            event.preventDefault(); // Prevent the default form submission
    
            // Get form values
            var emailAddress = $('#email').val();
            var totalSeats = 0;
            var totalCost = 0;
            var bookingId = 0;

            $('.ticket-quantity').each(function() {
                var quantity = parseInt($(this).val());
                if (!isNaN(quantity) && quantity > 0) {
                    totalSeats += quantity;
                    totalCost += quantity * parseFloat($(this).data('cost'));
                }
            });
            
    
            $.getJSON("http://localhost:3000/ticketType" , function(data) {
                console.log(data);

                console.log(totalCost);
                $.post("http://localhost:3000/createBooking", {"bookingDate": startDate, "totalCost": totalCost, "seats": totalSeats, "emailAddress" : emailAddress}, function(data){
                    console.log(data);
                    bookingId = data.bookingId; // Retrieve the bookingId from the response data
                    alert("Booking created successfully with ID: " + data.bookingId);
                    //window.location.href = "home.html";
                    //createTickets(bookingId, ticketTypes);
                    var seatsRemaining = currentSeats - totalSeats;
                    console.log(seatsRemaining);
                    $.getJSON("http://localhost:3000/screenings/" + screenId, function(data) {
                        console.log(data);
                        $.post("http://localhost:3000/updateScreening", {"movieId" : data[0].movieId, "startTime" : data[0].startTime, "endTime" : data[0].endTime, "seatsRemaining" : seatsRemaining, "screenId" : data[0].screenId}, function(data){
                            console.log(data);
                            alert("Screening updated successfullywith id: " + data.screenId);   
                        });
                    });
                    
                });
            });
        });
    });
});