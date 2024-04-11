$("document").ready(function() {
    displayCarouselMovies();
    displayMovies();
    populateDrpDwn();
    $('.carousel').carousel();
 });
 
 
 function displayMovies() {
    $.getJSON("http://localhost:3000/moviesScreens", function (data) {
        console.log(data);
        console.log(data.length);
        var output;
        var screenId = data[0].screenId;
        for(var i=0;i < data.length;i++)
        {
            
            output += `<tr>`;
            output += `<td><a href="viewDetails.html?movieId=${data[i].movieId}"><img src="${data[i].imageLink}" style="width: 150px;"></a></td>`;
            //output += `<td><a href="bookNow.html/?screenId="s")><img src="${data[i].imageLink}" style="width: 150px;"></a></td>`;
            //output += `<td><button class="btn btn-primary bookNow" data-screen-id(${data[i].screenId})'>Book now</button></td>`; // send screenId for booking and movieId too?
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

    function displayCarouselMovies() {
        $.getJSON("http://localhost:3000/movies", function (data) {
            console.log(data);
            console.log(data.length);
            var carouselIndicators = '';
            var carouselItems = '';
    
            for (var i = 0; i < data.length; i++) {
                var activeClass = '';
                if (i === 0) {
                    activeClass = 'active'; 
                }
    
                carouselIndicators += `<button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="${i}" class="${activeClass}" aria-current="true" aria-label="Slide ${i + 1}"></button>`;
    
                carouselItems += `
                    <div class="carousel-item ${activeClass}">
                        <img src="img/${data[i].title.replace(/\s+/g, '').toLowerCase()}.jpg" class="d-block w-100 mx-auto" alt="${data[i].title}">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${data[i].title}</h5>
                            <button class="btn btn-primary">Book Now</button>
                        </div>
                    </div>
                `;
            }
    
            $('#movieCarouselIndicators').html(carouselIndicators); 
            $('#movieCarouselInner').html(carouselItems); 
        });
    }
    