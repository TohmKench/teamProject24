$("document").ready(function() {

    displayMovies();
    populateDrpDwn();
    $('.carousel').carousel();
 });
 
 
 function displayMovies() {
    $.getJSON("http://localhost:3000/moviesScreens", function (data) {
        console.log(data);
        console.log(data.length);
        var output;
        for(var i=0;i < data.length;i++)
        {
            
            output += `<tr>`;
            output += `<td><a href="viewDetails.html?movieId=${data[i].movieId}">${data[i].title}</a></td>`;
            output += `<td>${data[i].language}</td>`;
            output += `<td><button class="btn btn-primary bookNow" data-screen-id(${data[i].screenId})'>Book now</button></td>`; // send screenId for booking and movieId too?
            output += `</tr>`; 
        }

        $("#displayMoviesScreens").append(output);
      });
 
 }

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
        
        var formattedDateTime = curr_year + "-" + curr_month + "-" + curr_date + " " + hours + ":" + minutes + ":" + seconds;
        
        return formattedDateTime;
    }

    function populateDrpDwn()
    {
        $.getJSON("http://localhost:3000/movies", function (data) {
            console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#movieSelect").append("<option>" + data[i].title + "</option>");
            
        }
    });
    }
    
    function redirectToScreenings(movieName) {
    
        window.location.href = "viewMovieScreenings.html?movieName=" + movieName;
        console.log(movieName);
    }
    