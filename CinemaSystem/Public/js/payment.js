    $(document).ready(function() {
    
        
        // For testing
        // var totalCost = 200;
        // var bookingDetails = {
        //     bookingDate: '2024-03-22',
        //     emailAddress: 'test@test.com',
        //     totalSeats: 2
        // };

        // Retrieve total cost and booking details from local storage
        var totalCost = localStorage.getItem('totalCost');
        var bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

        // Display total cost on payment page
        $('#totalAmount').text('€' + totalCost);

        // Stripe publishable key
        var stripe = Stripe('pk_test_51OzhFyDUeC3TT3wqiH828xSx3d9a99ON04Jc25Ez0Kox2eNaddyt7t31tdScRaDOIlqplQj73a2P7Z2N5yKu4fsD00ARDVhYJI');
        var elements = stripe.elements();
        var card = elements.create('card');
        card.mount('#card-element');

        $('#payment-form').submit(function(event) {
            event.preventDefault();
            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    $('#card-errors').text(result.error.message);
                } else {
                    stripeTokenHandler(result.token);
                }
            });
        });

        function stripeTokenHandler(token) {
            console.log(token);
            // Calling createBooking function
            createBooking(totalCost, bookingDetails);
        }

        function createBooking(totalCost, bookingDetails, currentSeats) {
            
            var date = bookingDetails.bookingDate;
            var email = bookingDetails.emailAddress;
            var seats = bookingDetails.totalSeats;
            var screenId = bookingDetails.screenId;
            var selectedTicketTypes = bookingDetails.selectedTicketTypes;
            var currentSeats = localStorage.getItem('currentSeats');
        
            /*$.post("http://localhost:3000/createBooking", {

                "bookingDate": date,
                "totalCost": totalCost,
                "seats": seats,
                "emailAddress": email
            }, function(data) {
                console.log(data);
                alert("Booking created successfully with ID: " + data.bookingId);
                // Redirecting to payment confirmation page
                window.location.href = "paymentConfirmation.html";
            });*/

            $.post("http://localhost:3000/createBooking", {"bookingDate": date, "totalCost": totalCost, "seats": seats, "emailAddress" : email}, function(data){
                        console.log(data);
                        bookingId = data.bookingId; // Retrieve the bookingId from the response data
                        alert("Booking created successfully with ID: " + data.bookingId);
                        //window.location.href = "home.html";
                        //createTickets(bookingId, ticketTypes);
                        var seatsRemaining = parseInt(currentSeats) - seats;
                        console.log(seatsRemaining);
                        $.getJSON("http://localhost:3000/screenings/" + screenId, function(data) {
                            console.log(data);
                            $.post("http://localhost:3000/updateScreening", {"movieId" : data[0].movieId, "startTime" : data[0].startTime, "endTime" : data[0].endTime, "seatsRemaining" : seatsRemaining, "screenId" : data[0].screenId}, function(data){
                                console.log(data);
                                alert("Screening updated successfully with id: " + data.screenId);   
                            });
                            selectedTicketTypes.forEach(function(ticketType) {
                                console.log(ticketType);
                                for(let i = 0; i < ticketType.quantity; i++) {
                                    $.post("http://localhost:3000/createTicket", {"bookingId": bookingId, "ticketType": ticketType.typeName, "screenId": ticketType.screenId}, function(data){
                                        console.log(data);
                                        alert("Ticket created successfully with ID: " + data.ticketId);
                                    });
                                }
                            });   
                            window.location.href = "paymentConfirmation.html";  
                        });
                                         
                    }); 
            
        }
    });

