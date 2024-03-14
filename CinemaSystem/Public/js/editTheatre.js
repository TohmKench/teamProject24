$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const theatreId = urlParams.get('theatreId');
    console.log(parseInt(theatreId));

    $('#theatreForm').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
      
      // Extract updated theatre details from the form
      const updatedTheatre = {
        capacity: $('#capacity').val()
        // Add more fields as necessary
      };

      
      $.post("http://localhost:3000/editTheatre/" + theatreId, updatedTheatre, function(data){
          console.log(data);
          alert("Theatre edited successfully");
          window.location.href = "theatre.html";
      });

    });
});