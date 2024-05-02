$("document").ready(function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
    var userType = localStorage.getItem('userType'); 

    var adminLink = userType === 'admin' 
        ? '<li class="nav-item"><a class="nav-link text-white" href="admin.html">Admin</a></li>'
        : '';

    var loginLogoutLink = isLoggedIn 
        ? '<li class="nav-item" style="margin-left: 605px;"><a class="nav-link text-white" href="account.html">My Account</a></li>'
        + '<li class="nav-item" style="margin-left: auto;"><a class="nav-link text-white" href="logout.html">Logout</a></li>'
        : '<li class="nav-item" style="margin-left: auto;"><a class="nav-link text-white" href="logIn.html">Log in</a></li>';

    var pageTitle = document.title; 

    $("#navBar").append(`
        <nav class="bg-secondary py-2">
            <div class="container">
                <ul class="nav justify-content-left">
                    <li class="nav-item"><a class="nav-link text-white" href="home.html"><img src="icons/home.png" onclick="window.location.href='home.html'" style="width: 30px; height: 25px;"></a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="home.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="screeningsByDate.html">Today's Screenings</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="map.html">About Us</a></li>
                    ${adminLink}
                    ${loginLogoutLink}
                </ul>
            </div>
        </nav>
    `);

    $("#header").append(`
    <header class="bg-dark text-white py-3" style="margin-top: 0px;">
    <div class="container">
                <h1 class="text-center">${pageTitle}</h1>
            </div>
        </header>
    `);

    $("#footer").append(`
        <footer class="bg-dark text-white py-3">
            <div class="container text-center">
                <p>&copy; 2024 Cinema System. All rights reserved.</p>
            </div>
        </footer>
    `);
});
