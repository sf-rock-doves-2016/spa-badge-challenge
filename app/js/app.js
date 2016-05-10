// Miniquery Library

// Show specific teacher

// Listen for event on teacher (clikc)
// Hide the body of the index.html
// Show the sample-page.html for the selected teacher
// Use miniquery sweetSelector and dispatcher modules to run handlebar module below


// This should not be a self-invoking function. It needs to be triggered by the click event

$(function (){
  // Grab the template script
  var teacherHeaderTemplate = $("#teacher-list").html();
  // Compile the template
  var teacherHeader = Handlebars.compile(teacherHeaderTemplate);
  // Define our data
  var teacherName = {
    "name": "" // This needs to come from the miniquery sweetSelector and Dispatcher modules
  };
  // Pass data to the template
  car compiledTeacherHeaderHtml = teacherHeader(teacherName);
  // Add the compiled teacher name to the page header
  $('.show-user').html(compiledTeacherHeaderHtml);
});



