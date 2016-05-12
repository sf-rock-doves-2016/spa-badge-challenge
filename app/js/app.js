// Miniquery Library

// Show specific teacher

// Listen for event on teacher (click)
// Hide the body of the index.html
// Show the sample-page.html for the selected teacher
// Use miniquery sweetSelector and dispatcher modules to run handlebar module below


// This should not be a self-invoking function. It needs to be triggered by the click event
window.onload = function(){

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
      // $('.show-user').html(compiledTeacherHeaderHtml);
    })
    // showTeacherNameListener();
  }

// document ready
//   listTeachers();
//   logic...

// var showTeacher = function(){
//  var selectedTeacher = EventDispatcher.on({
//   )}
// }

// Add a trigger to the result of the listener function and the action of that trigger should be the hiding and showing of the element.

var showTeacher = (function(){
  return {
    listen: function(){
      // Call the EventDispatcher.on using sweet selector to attach a listener to the namespace=ul and childSelector=a
      EventDispatcher.on('#teacher-unordered-list', 'a', 'click', function(e){
        e.preventDefault();
        console.log(e);

      })
    },
    trigger: function(){
      // Call the EventDispatcher.trigger on the result of the listen function???
      console.log("Here")
      EventDispatcher.trigger('#teacher-unordered-list', 'a', getData())
    },
    getData: function(){
      // Use the id of the trigger target to send an Ajax request to the server
      // Retrun the response
      console.log(e)
      AjaxWrapper.request({
        url: "https://spa-badge-api.herokuapp.com/teachers"+teacherid,
        type: "GET"
      }).then(function(response){
        console.log(response)
        var badgeObjects = JSON.parse(response);
        console.log(badgeObjects)
      });

    },
    hideElements: function(){
      // Call DOM.hide on index page elements that are not needed
    },
    showElements: function(){
      // Call DOM.show on the teacher show page elements that are needed
    }
  }
})();
};




// var showTeacherNameListener = (function(){
//   return {
//     listen: function (, showTeacherNameTrigger()){}
//     EventDispatcher.on
//      // var teacherid = self.target.getAttribute('id');
//      // console.log(teacherid);
//     // getTeacherBadges(id);
//     // showTeacherNameTrigger();
//   }
// })();

// var showTeacherNameTrigger = function(){
//   EventDispatcher.trigger(showTeacherNameListener,teacherShow());

//   teacherShow();
// }
// var teacherShow = function(showTeacherNameTrigger){
//   console.log("here");
//   debugger
//   console.log(this.target);
//   console.log(self);
//       // e.preventDefault();
//   // var teacherid = this.target.getAttribute('id');
//   AjaxWrapper.request({
//     url: "https://spa-badge-api.herokuapp.com/teachers"+teacherid,
//     type: "GET"
//   }).then(function(response){
//     console.log(response)
//     var badgeObjects = JSON.parse(response);
//     console.log(badgeObjects)
//   });

// }