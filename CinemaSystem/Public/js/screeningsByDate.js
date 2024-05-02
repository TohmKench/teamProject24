$(document).ready(function() {
    var currentDate = new Date(); // Start with today's date

    // Display formatted date and fetch screenings for the initial date
    updateDisplayAndFetchScreenings(currentDate);

    // Handler for Previous Day button
    $("#prevDate").click(function() {
        currentDate = changeDate(currentDate, -1);
        updateDisplayAndFetchScreenings(currentDate);
    });

    // Handler for Next Day button
    $("#nextDate").click(function() {
        currentDate = changeDate(currentDate, 1);
        updateDisplayAndFetchScreenings(currentDate);
    });

    // Update display date and fetch screenings
    function updateDisplayAndFetchScreenings(date) {
        $("#displayDate").html(returnDisplayFormattedDate(date));
        fetchAndDisplayScreenings(returnFormattedDate(date));
    }

    // Fetch and display screenings from API
    function fetchAndDisplayScreenings(date) {
        $.getJSON(`http://localhost:3000/screeningsByDate/${date}`, function(screenings) {
            const tableBody = $('#screeningsByDateTable tbody');
            tableBody.empty(); // Clear previous entries

            if (screenings.length === 0) {
                tableBody.append('<tr><td colspan="3">No screenings scheduled for this date.</td></tr>');
            } else {
                screenings.forEach(screening => {
                    const formattedStartTime = new Date(screening.startTime).toLocaleString();
                    tableBody.append(`
                        <tr>
                            <td>${formattedStartTime}</td>
                            <td>${screening.movieTitle}</td>
                            <td>${screening.theatreId}</td>
                            <td><button class="btn btn-primary" onclick="window.location.href = 'bookNow.html?screenId=${screening.screenId}'">Book Now</button></td>
                        </tr>
                    `);
                });
            }
        });
    }

    // Return the date adjusted by a certain number of days
    function changeDate(date, days) {
        var newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    // Return a date
    function returnFormattedDate(date) {
        var resultDate = new Date(date);
        var curr_date = resultDate.getDate();
        var curr_month = resultDate.getMonth() + 1;
        var curr_year = resultDate.getFullYear();
        return `${curr_year}-${curr_month < 10 ? '0' + curr_month : curr_month}-${curr_date < 10 ? '0' + curr_date : curr_date}`;
    }

    // Return a string
    function returnDisplayFormattedDate(date) {
        var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayOfWeek = daysOfWeek[date.getDay()];
        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1;
        var curr_year = date.getFullYear();
        return `${dayOfWeek}, ${curr_month < 10 ? '0' + curr_month : curr_month}/${curr_date < 10 ? '0' + curr_date : curr_date}/${curr_year}`;
    }
});
