$(document).ready(function() {
    $("#logoutButton").click(function(event) {
        event.preventDefault();

        // Clear the local storage item
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('password');
        localStorage.removeItem('email');
        localStorage.removeItem('userID');
        
        // Redirect the user to the login page
        window.location.href = "logIn.html";
    });
});
