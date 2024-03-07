$(document).ready(function() {
    $(function() {
        $.ajax({
            url: 'header.html',
            dataType: 'html',
            success: function(data) {
                $('#header').append(data);
            },
        });
    });

    function editBooking(bookingId) {
        console.log("Inside editBooking function with bookingId:", bookingId);
        console.log("Edit button clicked");
        window.location.href = "editBooking.html?id=" + bookingId;
    }
    

    // Fetch data from Express route '/getBooking'
    $.getJSON("http://localhost:3000/booking/", function(data){
    console.log(data);
    var counter = 0;
    data.forEach(function(item) {
        console.log(item.bookingId);  
        var editButton = `<button class="btn btn-primary editBooking" data-booking-id="${item.bookingId}">Edit</button>`; // Added editBooking class
        var deleteButton = ' <button class="deleteBooking btn btn-primary ml-3">Delete</button>';
        $("#bookingsTable").append('<tr><td>' + item.bookingDate + '</td><td>' + item.totalCost + '</td><td>' + item.seats + '</td><td>' + item.emailAddress + '</td><td>' + editButton + '</td><td>' + deleteButton + '</td></tr>');
    });

    $("#bookingsTable").on("click", ".editBooking", function() {
        var bookingId = $(this).data('bookingId');
        console.log("Edit button clicked");
        window.location.href = "editBooking.html?id=" + bookingId;
    });


    $("#createBooking").click(function() {
        console.log("Create button clicked");
        window.location.href = "createBooking.html";
    });
}); // Remove this extra closing bracket

}); // Add this closing bracket
