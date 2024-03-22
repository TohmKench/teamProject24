$("document").ready(function () {

            // Get email and password from localStorage
            var email = localStorage.getItem('email');
            var password = localStorage.getItem('password');
    
            $('#email').text(email);
    
            // Attach click event handler to #editEmail button
            $('#editEmail').click(function() {
                window.location.href = 'editEmail.html';
            });
    
            // Attach click event handler to #editPassword button
            $('#editPassword').click(function() {
                window.location.href = 'editPassword.html';
            });
    
            // Attach click event handler to #delete button
            $('#delete').click(function() {
                var userId = localStorage.getItem('userId'); // Get userId from localStorage

                deleteAccount(userId);
            });


});


function deleteAccount(userId) {
    if (confirm("Are you sure you want to delete this Account?")) {
        $.post(
            "http://localhost:3000/deleteAccount",
            {"userId":userId},
            function(response) {
                alert("Account deleted successfully");
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userType');
                localStorage.removeItem('email');
                localStorage.removeItem('password');
                localStorage.removeItem('userId');
                window.location.href="http://localhost:3000/home.html";
            }
        ).fail(function(jqXHR, textStatus, errorThrown) {
            // Handle error
            alert("Error deleting account: " + textStatus + " - " + errorThrown);
        });
    }
}
