// Whenever someone clicks a p tag
$(document).on("click", "#Commentsbutton", function() {
  // Empty the Comments from the comment section
  $("#Comments").html("<h1>Comments</h1>");
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the comment information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#Comments").append("<h2>" + data.headline + "</h2>");
      // An input to enter a new title
      // $("#Comments").append("<input id='titleinput' name='title' >");
      // A textarea to add a new comment body
      $("#Comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new comment, with the id of the article saved to it
      $("#Comments").append(
        "<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>"
      );
      $("#Comments").append(
        "<button id='deletebutton' data-id='{{this._id}}'>Clear Comment</button>"
      );
      $("#Comments").append(
        "<h3>Latest Comment</h3>" + "<p>" + data.comment.body + "</p>"
      );

      // If there's a comment in the article
      if (data.comment) {
        // Place the title of the comment in the title input
        // $("#titleinput").val(data.comment.title);
        // Place the body of the comment in the body textarea
        $("#bodyinput").val(data.comment.body);
        // $("#Comments").append("<p>" + data.comment.body + "</p>");
      }
    });
});

// When you click the savecomment button
$(document).on("click", "#savecomment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the comment, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      // Value taken from comment textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // $("#Comments").append(
      //   "<h3>Latest Comment</h3>" + "<p>" + data.comment.body + "</p>"
      // );
      // Log the response
      console.log(data);
      // Empty the Comments section
      $("#Comments").empty();
    });

  // Also, remove the values entered in the input and textarea for comment entry
  $("#bodyinput").val("");
});

$(document).on("click", "#deletebutton", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the comment, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      // Value taken from comment textarea
      body: $("#bodyinput").val("")
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the Comments section
      $("#Comments").empty();
    });

  // Also, remove the values entered in the input and textarea for comment entry
  $("#bodyinput").val("");
});