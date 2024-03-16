$(document).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieName = urlParams.get('movieName');

  $.getJSON("http://localhost:3000/movieScreenings/" + movieName, function(data) {
  
      console.log(data.length);
      $("#movieTitle").html(`Screenings for movie: '${data[0].movieTitle}'`);
    $.getJSON("http://localhost:3000/movieScreenings/" + movieName, function(data) {
    
        console.log(data.length);
        $("#movieTitle").html(`Screenings for movie: '${data[0].movieTitle}'`);

        var output ="";
        for(var i=0;i < data.length;i++)
        {
        // console.log("hi");
            console.log(data[0].movieTitle);
            output += `<td>${returnFormattedDate(data[i].startTime)}</td>`;
            output += `<td>${returnFormattedDateTime(data[i].startTime)}</td>`;
            output += `<td>${returnFormattedDateTime(data[i].endTime)}</td>`;
            output += `<td>${data[i].runTime} mins</td>`;
            output += `<td><button class="btn btn-primary bookNow"  data-screen-id="(${data[i].screenId}")'>Book this screen</button></td>`;
            output += `</tr>`;
        }

        $("#displayMovieScreenings").append(output);


    });

    $(document).on('click', '.bookNow', function() {
        var screenId = $(this).data('screen-id');
        console.log("Book this screen button clicked for screenId: " + screenId);
        window.location.href = "bookNow.html?screenId=" + parseInt(screenId);
    });

});

function returnFormattedDate(dt) {
var resultDate = new Date(dt);

  var curr_date = resultDate.getDate();
  if (curr_date < 10) {
      curr_date = '0' + curr_date;
  }

  var curr_month = resultDate.getMonth() + 1;
  if (curr_month < 10) {
      curr_month = '0' + curr_month;
  }

  var curr_year = resultDate.getFullYear();

  var formattedDate = curr_year+"-"+curr_month+"-"+curr_date;

  return formattedDate;
}

function returnFormattedDateTime(dt) {
  var resultDate = new Date(dt);

  var curr_date = resultDate.getDate();
  if (curr_date < 10) {
      curr_date = '0' + curr_date;
  }

  var curr_month = resultDate.getMonth() + 1;
  if (curr_month < 10) {
      curr_month = '0' + curr_month;
  }

  var curr_year = resultDate.getFullYear();

  var hours = resultDate.getHours();
  if (hours < 10) {
      hours = '0' + hours;
  }

  var minutes = resultDate.getMinutes();
  if (minutes < 10) {
      minutes = '0' + minutes;
  }

  var seconds = resultDate.getSeconds();
  if (seconds < 10) {
      seconds = '0' + seconds;
  }

  var formattedDateTime = hours + ":" + minutes + ":" + seconds;

  return formattedDateTime;
}
