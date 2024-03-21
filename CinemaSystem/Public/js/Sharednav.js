$("document").ready(function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if the user is logged in
    var userType = localStorage.getItem('userType'); // Get the user type

    

    var adminLink = userType === 'admin' 
        ? '<li class="nav-item"><a class="nav-link text-white" href="admin.html">Admin</a></li>'
        : '';
        

        var loginLogoutLink = isLoggedIn 
        ? '<li class="nav-item"><a class="nav-link text-white" href="logout.html">Logout</a></li>'
        : '<li class="nav-item"><a class="nav-link text-white" href="logIn.html">Log in</a></li>';

    $("#myDiv").append(`
        <nav class="bg-secondary py-2">
            <div class="container">
                <ul class="nav justify-content-center">
                    <li class="nav-item"><a class="nav-link text-white" href="home.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="screeningsByDate.html">Today's Screenings</a></li>
                    ${adminLink}
                    ${loginLogoutLink}
                </ul>
            </div>
        </nav>
        <footer class="bg-dark text-white py-3" style="position: absolute; bottom: 0; width: 100%; height: 60px;">
            <div class="container text-center">
                <p>&copy; 2024 Cinema System. All rights reserved.</p>
            </div>
        </footer>`
    );
});