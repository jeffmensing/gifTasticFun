var sports = ["football", "baseball", "tennis", "rugby", "golf", "boxing", "swimming", "vollyball", "gymnastics", "surfing", "soccer", "ping pong", "dodgeball", "ice hockey", "softball", "ice skating", "badminton", "handball", "field hockey", "rowing", "bowling", "snowboarding"];

function renderButtons() {
    //deleting sports buttons prior to adding new buttons
    $("#buttons-view").empty();
    //loop through the array of sports
    for (var i = 0; i < sports.length; i++) {
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of sport to our button
        a.addClass("sport");
        // Adding a data-attribute
        a.attr("data-name", sports[i]);
        // Providing the initial button text
        a.text(sports[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

function displayGifs() {
    // In this case, the "this" keyword refers to the button that was clicked
    var clickedSport = $(this).attr("data-name");
    console.log(this);
    // Constructing a URL to search Giphy for the sport
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickedSport + "&api_key=dc6zaTOxFJmzC&limit=10";
    //Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(queryURL);
            console.log(response);
            //Storing the data returned data from AJAX request
            var results = response.data;
        });
}


$("#add-sport").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var sport = $("#sport-input").val().trim();
    // Adding movie from the textbox to our array
    sports.push(sport);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Event listener for all sport class button elements
$(document).on("click", ".sport", displayGifs);

renderButtons();
