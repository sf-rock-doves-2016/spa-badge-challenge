// Miniquery Library

// Show specific teacher

// Listen for event on teacher (clikc)
// Hide the body of the index.html
// Show the sample-page.html for the selected teacher
// Use miniquery sweetSelector and dispatcher modules to run handlebar module below


// This should not be a self-invoking function. It needs to be triggered by the click event

var listTeachers = function(){
  AjaxWrapper.request({
    url: 'https://spa-badge-api.herokuapp.com/teachers',
    type: 'GET'
  }).then(function(response) {
    var teachers = JSON.parse(response);
    // Grab the template script
    var teacherHeaderTemplate = SweetSelector.select("#teacher-link-template").innerHTML;

    // Compile the template
    var teacherHeader = Handlebars.compile(teacherHeaderTemplate);

    // Define our data
    var context ={

      teacherObjs: teachers
    }
    // Pass data to the template
    var compiledTeacherHeaderHtml = teacherHeader(context);
    // Add the compiled teacher name to the page header
    // listTeachers();
    SweetSelector.select("#teacher-unordered-list").innerHTML=compiledTeacherHeaderHtml;
      debugger
    // $('.show-user').html(compiledTeacherHeaderHtml);
  })
}

// document ready
//   listTeachers();
//   logic...



