$(document).ready(function(){
    $('#bookingForm').submit(function(event){
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        var date = $('#date').val();
        var cost = $('#cost').val();
        var email = $('#email').val();
        var seats = $('#seats').val();

        // Send data with keys matching the server-side expectations
        $.post("http://localhost:3000/createBooking", {"bookingDate": date, "totalCost": cost, "seats": seats, "emailAddress" : email}, function(data){
            console.log(data);
            alert("Booking created successfully");
            window.location.href = "booking.html";
        });
    });
});
