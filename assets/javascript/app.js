var topics = ["Batman", "Captain America", "Iron Man", "Superman", "Spider-Man", "Wonder Woman"];

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var hero = $("<button>");
      hero.addClass("hero");
      hero.attr("data-name", topics[i]);
      hero.text(topics[i]);
      $("#buttons-view").append(hero);
    }
}

function addButton() {
    event.preventDefault();
    var hero = $("#hero-input").val().trim();
    topics.push(hero);
    renderButtons();
}


    
function displayGifs() {
   var hero = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   hero + "&api_key=witzkK7lz0aQdpPiDOatUym4TQQkj6qO&limit=10";
   $.ajax({
    url: queryURL,
    method: "GET"
   })
    .then(function(response) {
      var results = response.data;
      console.log(response);
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var r = $("<p>").text("Rating: " + rating);
        var heroImage = $("<img>");
        heroImage.attr("src", results[i].images.fixed_height_still.url);
        heroImage.attr("data-still", results[i].images.fixed_height_still.url);
        heroImage.attr("data-animate", results[i].images.fixed_height.url);
        heroImage.attr("data-state", "still");
        heroImage.addClass("gif");
        gifDiv.append(r);
        gifDiv.append(heroImage);
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
}

function changeState() {
  var state = $(this).attr("data-state");
  console.log(state);
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}


$(document).on("click", ".hero", displayGifs);
$(document).on("click", "#add-hero", addButton);
$(document).on("click", ".gif", changeState);

renderButtons();