$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieName = urlParams.get('movieName');

    $.getJSON("http://localhost:3000/movieScreenings/" + movieName, function(data) {
    
        console.log(data.length);

        data.forEach(function(item) {
            console.log(item.movieTitle);
            $("#movieTitle").html(`Screenings for movie: '${item.movieTitle}'`);
            $("#displayMovieScreenings").append(`<tr><td>${returnFormattedDate(item.startTime)}</td>
            <td>${returnFormattedDateTime(item.startTime)}</td><td>${returnFormattedDateTime(item.endTime)}</td>
            <td>${item.runTime} mins</td><td><button class="btn btn-primary bookNow" data-screen-id="${item.screenId}">Book this screen</button></td></tr>`)
        });

        $(".bookNow").click(function() {
            var screenId = $(this).data('screen-id');
            console.log("Book button clicked");
            window.location.href = "bookNow.html?screenId=" + screenId;
        });
    });
});


function returnFormattedDate(dt) {
  var resultDate = new Date(dt);

  var curr_date = resultDate.getDate();
  if (curr_date < 10) 
  {
      curr_date = '0' + curr_date;
  }
  
  var curr_month = resultDate.getMonth() + 1;
  if (curr_month < 10) 
  {
      curr_month = '0' + curr_month;
  }
  
  var curr_year = resultDate.getFullYear();
  
  var formattedDate = curr_year+"-"+curr_month+"-"+curr_date;
  
  return formattedDate;
}

  function returnFormattedDateTime(dt) {
      var resultDate = new Date(dt);
  
      var curr_date = resultDate.getDate();
      if (curr_date < 10) 
      {
          curr_date = '0' + curr_date;
      }
      
      var curr_month = resultDate.getMonth() + 1;
      if (curr_month < 10) 
      {
          curr_month = '0' + curr_month;
      }
      
      var curr_year = resultDate.getFullYear();
      
      var hours = resultDate.getHours();
      if (hours < 10) 
      {
          hours = '0' + hours;
      }
      
      var minutes = resultDate.getMinutes();
      if (minutes < 10) 
      {
          minutes = '0' + minutes;
      }
      
      var seconds = resultDate.getSeconds();
      if (seconds < 10) 
      {
          seconds = '0' + seconds;
      }
      
      var formattedDateTime = hours + ":" + minutes + ":" + seconds;
      
      return formattedDateTime;
  }

