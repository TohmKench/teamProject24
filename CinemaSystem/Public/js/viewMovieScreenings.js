$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieName = urlParams.get('movieName');

    $.getJSON("http://localhost:3000/movieScreenings/" + movieName, function(data) {
    
  console.log(data.length);

  var output ="";
  for(var i=0;i < data.length;i++)
  {
   // console.log("hi");
     console.log(data[0].movieTitle);
      output += `<tr>`;
      output += `<td>${data[i].movieTitle}</td>`;
      output += `<td></td>`;
      output += `<td>${data[i].startTime}</td>`;
      output += `</tr>`;
  }

  $("#displayMovieScreenings").append(output);


  });

});
