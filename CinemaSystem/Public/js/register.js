$(document).ready(function() {
    $("#registerForm").submit(function(event) {
        event.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();
        let userType = "customer"; // Set userType to "customer"

        console.log("Email: ", email);
        console.log("Password ", password);
        console.log("User type: ", userType);   
        $.post("http://localhost:3000/register", {email: email, password: password, userType: userType })
        .done(function(data) {
            console.log("Data received: ", data);
            
                alert("Registration successful!");
                window.location.href = "http://localhost:3000/home.html";
            
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Request failed: ", textStatus, errorThrown);
            alert("Error: " + textStatus + ", " + errorThrown);
        });
    });
});