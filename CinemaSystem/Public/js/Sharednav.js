$("document").ready(function () {

$("#myDiv").append(`
<header class="bg-dark text-white py-4">
        <div class="container">
            <h1 class="text-center">Movies</h1>
        </div>
    </header>
<nav class="bg-secondary py-2">
<div class="container">
    <ul class="nav justify-content-center">
        <li class="nav-item"><a class="nav-link text-white" href="home.html">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="movies.html">Movies</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="screenings.html">Screenings</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="screeningsByDate.html">Today's Screenings</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="logIn.html">Log in</a></li>
    </ul>
</div>
</nav>`
);

});