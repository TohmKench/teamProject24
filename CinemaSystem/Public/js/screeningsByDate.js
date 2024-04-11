$(document).ready(function() {
    let currentDate = new Date().toISOString().split('T')[0]; // Start with today's date

    // Function to fetch and display screenings for a specific date
    function fetchAndDisplayScreenings(date) {
        fetch(`/screeningsByDate/${date}`)
            .then(response => response.json())
            .then(screenings => {
                const tableBody = $('#screeningsByDateTable tbody');
                tableBody.empty(); // Clear previous entries

                if (screenings.length === 0) {
                    tableBody.append('<tr><td colspan="3">No screenings scheduled for this date.</td></tr>');
                } else {
                    screenings.forEach(screening => {
                        // Adjusted to match your data properties
                        const formattedStartTime = new Date(screening.startTime).toLocaleString();
                        tableBody.append(`
                            <tr>
                                <td>${formattedStartTime}</td>
                                <td>${screening.movieTitle}</td>
                                <td>${screening.theatreName}</td>
                            </tr>
                        `);
                    });
                }
            })
            .catch(error => console.error('Error fetching screenings:', error));
    }

    // Function to change the current date and fetch screenings for the new date
    function changeDate(days) {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        currentDate = newDate.toISOString().split('T')[0];
        fetchAndDisplayScreenings(currentDate);
    }

    // Event listeners for previous and next date buttons
    $('#prevDate').click(() => changeDate(-1));
    $('#nextDate').click(() => changeDate(1));

    // Initially fetch and display screenings for today's date
    fetchAndDisplayScreenings(currentDate);
});
