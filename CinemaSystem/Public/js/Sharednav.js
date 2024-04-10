$("document").ready(function () {


    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';//Check if the user is logged in

    var loginLogoutLink = isLoggedIn 
        ? '<li class="nav-item"><a class="nav-link text-white" href="logout.html">Logout</a></li>'
        : '<li class="nav-item"><a class="nav-link text-white" href="logIn.html">Log in</a></li>';


$("#myDiv").append(`
<nav class="bg-secondary py-2">
<div class="container">
    <ul class="nav justify-content-center">
        <li class="nav-item"><a class="nav-link text-white" href="home.html">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="movies.html">Movies</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="screenings.html">Screenings</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="ticket.html">Ticket</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="ticketType.html">Ticket Type</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="screeningsByDate.html">Today's Screenings</a></li>
         ${loginLogoutLink}
    </ul>
</div>
</nav>`
);

});