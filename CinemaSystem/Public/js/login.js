$(document).ready(function() {
    $("#loginForm").submit(function(event) {
        event.preventDefault();

        var email = $("#username").val(); // Get the username from the input field
        var password = $("#password").val(); // Get the password from the input field

        console.log("Username: ", email);
        console.log("Password: ", password);

        $.post("http://localhost:3000/login", { email: email, password: password })
        .done(function(data) {
            console.log("Data received: ", data);
            if (data === 'Login successful') {
    localStorage.setItem('isLoggedIn', 'true'); // Set a local storage item
    alert("Login successful!");
    window.location.href = "http://localhost:3000/home.html";
} else {
    localStorage.setItem('isLoggedIn', 'false'); // Set a local storage item
    alert("Invalid email or password.");
}
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Request failed: ", textStatus, errorThrown);
            alert("Error: " + textStatus + ", " + errorThrown);
        });
    });
});

