$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('id');
    console.log(bookingId);

    $.get("http://localhost:3000/booking/"+bookingId, function(data){
        
        // Parse the JSON data
        var booking = JSON.parse(data);
        console.log(booking);

        // Update the form fields with the retrieved booking info
        $('#date').val(booking.bookingDate);
        $('#cost').val(booking.totalCost);
        $('#email').val(booking.emailAddress);
        $('#seats').val(booking.seats);
    });

    $('#editBooking').click(function() {
        console.log("Edit button clicked");
        $.post("http://localhost:3000/updateBooking", {
            id: bookingId,
            date: $('#date').val(),
            cost: $('#cost').val(),
            email: $('#email').val(),
            seats: $('#seats').val()
        }, function(response) {
            console.log(response);
            window.location.href = "booking.html"; // Redirect to booking.html
        });
    });
});
