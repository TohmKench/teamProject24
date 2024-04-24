$("document").ready(function () {

            // Get email and password from localStorage
            var email = localStorage.getItem('email');
            var password = localStorage.getItem('password');

            $('#currentEmail').val(email);
    
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
                var userID = localStorage.getItem('userID'); // Get userID from localStorage

                deleteAccount(userID);
            });

            console.log(localStorage.getItem('userID'));
});


$(document).ready(function() {
    $('#editEmailForm').submit(function(e) {
        e.preventDefault(); // Prevent default form submission

        // Get form inputs
        var newEmail = $('#newEmail').val();
        var password = $('#password').val();


        // Validate form inputs
        if (newEmail && password) {
            // If inputs are valid, call editEmail function
            editEmail(newEmail, password);
        } else {
            // If inputs are not valid, display an alert
            alert('Please fill out all fields.');
        }
    });

    $('#passwordForm').submit(function(e) {
        e.preventDefault(); // Prevent default form submission

        // Get form inputs
        var currentPassword = $('#currentPassword').val();
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();

        // Validate form inputs
        if (newPassword && confirmPassword && currentPassword) {
            // If inputs are valid, call editPassword function
            editPassword(currentPassword, newPassword, confirmPassword);
        } else {
            // If inputs are not valid, display an alert
            alert('Please fill out all fields.');
        }
    });

$('#editCardDetails').click(function() {
        window.location.href = 'editCardDetails.html'; // Redirect to the edit card details page
 });

$('#editCardDetailsForm').submit(function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form inputs
    var cardno = $('#cardNo').val();
    var cvv = $('#cvv').val();
    var expirydate = $('#expiryDate').val();

    // Validate form inputs using Luhn's Algorithm
    if (cardno && cvv && expirydate && luhnCheck(cardno)) {
        // If inputs are valid, call editCardDetails function
        editCardDetails(cardno, cvv, expirydate);
    } else {
        // If inputs are not valid, display alert
        alert('Please fill out all fields correctly. Ensure the card number is valid.');
    }
});

function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return (sum % 10) === 0;
}

function editCardDetails(cardno, cvv, expirydate) {
    // Get the userID from localStorage
    var userID = localStorage.getItem('userID');

    // Send the card details to the server
    $.post(
        "http://localhost:3000/updateCardDetails",
        {
            "cardNo": cardno,
            "cvv": cvv,
            "expiryDate": expirydate,
            "userID": userID
        },
        function(response) {
            // Handle successful response
            console.log(response);
            alert("Card details updated successfully");
            // Redirect to account page
            window.location.href = "http://localhost:3000/account.html";
        }
    ).fail(function(jqXHR, textStatus, errorThrown) {
        // Handle error
        alert("Error updating card details: " + textStatus + " - " + errorThrown);
    });
}



window.deleteAccount = function(userID) {
    if (confirm("Are you sure you want to delete this Account?")) {
        $.post(
            "http://localhost:3000/deleteAccount",
            {"userID":userID},
            function(response) {
                alert("Account deleted successfully");
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userType');
                localStorage.removeItem('email');
                localStorage.removeItem('password');
                localStorage.removeItem('userID');
                window.location.href="http://localhost:3000/home.html";
            }
        ).fail(function(jqXHR, textStatus, errorThrown) {
            // Handle error
            alert("Error deleting account: " + textStatus + " - " + errorThrown);
        });
    }
}

    function editEmail(newEmail, password) {
        // Get the stored password
        var storedPassword = localStorage.getItem('password');
        var userID = localStorage.getItem('userID'); // Get userID from localStorage

        console.log(newEmail);
        console.log(password);
        console.log(storedPassword);
        // Check if the entered password matches the stored password
        if (password === storedPassword) {
            // If the password is correct, send the newEmail to the server
            $.post(
                
                "http://localhost:3000/updateEmail",
                {
                    "newEmail": newEmail,
                    "userID": userID
                },
                function(response) {
                    // Handle successful response
                    console.log(response);
                    alert("Email updated successfully");
                    localStorage.setItem('email', newEmail); // Update email in localStorage
                    window.location.href="http://localhost:3000/account.html"; // Redirect to account page
                }
            ).fail(function(jqXHR, textStatus, errorThrown) {
                // Handle error
                alert("Error updating email: " + textStatus + " - " + errorThrown);
            });
        } else {
            // If the password is incorrect, display an alert
            alert('Incorrect password. Please try again.!');
        }
    }


    function editPassword(currentPassword, newPassword, confirmPassword) {
        // Get the stored password and userID
        var storedPassword = localStorage.getItem('password');
        var userID = localStorage.getItem('userID');

        if (storedPassword !== currentPassword) {
            alert('Current password is incorrect. Please try again.!!');
            return; // Stop the function
        }
    
        // Check if newPassword and confirmPassword are the same
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match. Please try again.');
            return; // Stop the function
        }
    
        // Check if newPassword is not equal to storedPassword
        if (newPassword === storedPassword) {
            alert('New password must be different from current password. Please try again.');
            return; // Stop the function
        }
        5
            
            // If the password is correct, send the newPassword to the server
            $.post(
                "http://localhost:3000/updatePassword",
                {
                    "newPassword": newPassword,
                    "userID": userID
                },
                function(response) {
                    // Handle successful response
                    console.log(response);
                    alert("Password updated successfully");
                    localStorage.setItem('password', newPassword); // Update password in localStorage
                     window.location.href="http://localhost:3000/account.html"; // Redirect to account page
                }
            ).fail(function(jqXHR, textStatus, errorThrown) {
                // Handle error
                alert("Error updating password: " + textStatus + " - " + errorThrown);
            });
        }
    
    });
