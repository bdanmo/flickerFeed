$(document).ready(function() {
 var $searchField = $("#search"), 
     $submitButton = $("#submit"),
     $photosDiv = $('#photos');
  
  $searchField.on("focus", function() {
     $photosDiv.html("");
   }); //end on
  $('form').submit(function (evt) {
    
    //make stuff work nice
    evt.preventDefault();
    $searchField.prop('disabled', true);
    $submitButton.prop('disabled', true).val("Loading...");        
    
    //AJAX stuff
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var searchTerm = $searchField.val();
    var flickrOptions = {
      tags: searchTerm,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = "";
      if (data.items.toString() === "")
        photoHTML += "<h1>No results found for " + searchTerm + ".</h1>";
      else {
        $.each(data.items, function(i, photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); // end each
      }
      $photosDiv.html(photoHTML);
      
      //end AJAX stuff, make stuff work nice again
      $searchField.prop('disabled', false);
      $submitButton.prop('disabled', false).val("Search");
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
  }); // end submit
}); // end ready