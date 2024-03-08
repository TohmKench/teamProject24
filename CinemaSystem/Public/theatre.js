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

    

    // Fetch data from Express route '/getBooking'
    $.getJSON("http://localhost:3000/theatre/", function(data){
    console.log(data);
    var counter = 0;
    data.forEach(function(item) {
        console.log(item.theatreId);  
        var editButton = `<button class="btn btn-primary editBooking" data-theatre-id="${item.theatreId}">Edit</button>`; // Added editBooking class
        var deleteButton = `<button class="btn btn-primary deleteBooking" data-theatre-id="${item.theatreId}">Delete</button>`;
        $("#theatreTable").append('<tr><td>' + item.theatreId + '</td><td>' + item.capacity + '<td>' + editButton + '</td><td>' + deleteButton + '</td></tr>');
    });



        $("#createTheatre").click(function() {
            console.log("Create button clicked");
            window.location.href = "createTheatre.html";
        });

        $(document).on('click', '.editBooking', function() {
            var theatreId = $(this).data('theatre-id');
            console.log("Edit button clicked for theatreId: " + theatreId);
            window.location.href = "editTheatre.html?theatreId=" + theatreId;
        });

        $(document).on('click', '.deleteBooking', function() {
            var theatreId = $(this).data('theatre-id');
            console.log("Delete button clicked for theatreId: " + theatreId);
            $.ajax({
                url: "http://localhost:3000/deleteTheatre/" + theatreId,
                type: 'DELETE',
                success: function(result) {
                    alert("Theatre deleted successfully");
                    window.location.href = "theatre.html";
          
                }
            });
        }); 
}); }); // Add this closing bracket
