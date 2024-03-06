// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //The following code display the current day 
  var today = dayjs(); //using dayjs we get the current day 
  $('#currentDay').text(today.format('dddd, MMMM D'));// display the text with Day, month and day format 


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // Get the current hour in 24-hour format
  var currentHour = today.hour();

  // Loop through each time block
  $('.time-block').each(function() {
    // Extract the hour from the time block's ID
    var blockHour = parseInt($(this).attr('id').split('-')[1]);

    // Remove any existing classes to reset
    $(this).removeClass('past present future');

    // Compare the block's hour with the current hour and apply the appropriate class
    if (blockHour < currentHour) {
      $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
  // saveBtn function 
  $(".saveBtn").on("click", function() {
    // Get the description text and its associated hour
    var descriptionText = $(this).siblings(".description").val();
    var hour = $(this).parent().attr("id");

    // Save the description text in local storage with the hour as the key
    localStorage.setItem(hour, descriptionText);
  })

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $('.time-block').each(function() {
    var hour = $(this).attr('id');
    var savedDescription = localStorage.getItem(hour);

    // Set the value of the textarea if there's a saved description
    if (savedDescription !== null) {
      $(this).find('.description').val(savedDescription);
    }
  });
  //
  // TODO: Add code to display the current date in the header of the page.
});
