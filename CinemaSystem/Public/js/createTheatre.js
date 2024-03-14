$(document).ready(function(){
    $('#theatreForm').submit(function(event){
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        var capacity = $('#capacity').val();
        

        // Send data with keys matching the server-side expectations
        $.post("http://localhost:3000/createTheatre", {"capacity": capacity}, function(data){
            console.log(data);
            alert("Theatre created successfully");
            window.location.href = "theatre.html";
        });
    });
});
