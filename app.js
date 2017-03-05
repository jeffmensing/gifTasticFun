var sports = ["football", "baseball", "tennis", "rugby", "golf", "boxing", "swimming", "volleyball", "gymnastics", "surfing", "soccer", "ping pong", "dodgeball", "ice hockey", "softball", "ice skating", "badminton", "handball", "field hockey", "rowing", "bowling", "snowboarding"];

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
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedSport + "&api_key=dc6zaTOxFJmzC&limit=10";
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
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var sportDiv = $("<div>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                // Creating and storing an image tag
                var sportImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                sportImage.attr("src", results[i].images.fixed_height.url);
                // Appending the paragraph and image tag to the animalDiv
                sportDiv.append(p);
                sportDiv.append(sportImage);
                console.log(sportImage);
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gif-view").prepend(sportDiv);
            }
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
