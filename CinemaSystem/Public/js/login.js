$(document).ready(function() {
    $("#loginForm").submit(function(event) {
        event.preventDefault();


        // Assuming you have a function to get user data from the database
        var email = $("#username").val(); // Get the username from the input field
        var password = $("#password").val(); // Get the password from the input field
            
        
        $.post("http://localhost:3000/login", { email: email, password: password })
        .done(function(data) {
            console.log("Data received: ", data);
            if (data && data.length > 0) {
                // Get user data
                var userData = data[0];
                console.log(userData);
                console.log("Username: ", email);
                console.log("Password: ", password);
                // Store user data in local storage
                localStorage.setItem('isLoggedIn', 'true'); // Set a local storage item
                localStorage.setItem('userID', userData.userID);
                localStorage.setItem('userType', userData.userType);
                localStorage.setItem('email', userData.email);
                localStorage.setItem('password', userData.password);

                //window.location.href = "http://localhost:3000/home.html";
            } else {
                localStorage.setItem('isLoggedIn', 'false'); // Set a local storage item
                alert("Invalid email or password.");
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Request failed: ", textStatus, errorThrown);
        });
    });
});

