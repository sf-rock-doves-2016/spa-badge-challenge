document.addEventListener("DOMContentLoaded", function(){
  // EventDispatcher.on("click", function(){
  //   console.log("click");
  // });


  // var listTeachers = function () {
    SweetSelector.ajaxClone({
      url:'http://localhost:3000/teachers',
      method: 'GET'
    }).then(function(response){
      console.log(response)
      var list = SweetSelector.select("#teacher-list");
      console.log(list)
      var teachers = JSON.parse(response);
      console.log(teachers)
      for (var i = 0; i < teachers.length; i++){
        var listItem = document.createElement("li");
        listItem.innerHTML = "<a href='#"+teachers[i].name+"'>"+teachers[i].name+"</a>"
        list.appendChild(listItem);
      }
    }).catch(function(error){
      console.log(error);
    });
  // }


});
// var cookies = document.cookie.split(";")
// var vote = badgeID + '=upvote'
// if (cookies.includes(vote)) {
//   alert("You already upvoted")
// } else if (cookies.includes(badgeID + '=downvote')) {
//     for(var i = cookies.length - 1; i >= 0; i--) {
//       if(cookies[i] === badgeID + '=downvote') {
//          cookies.splice(i, 1);
//       }
//     }

// }

// var setTeacherListeners = function() {
//   $('.teacher-links').on('click', function(e){
//     var name = e.target.href;
//     hideTeacher();
//     showTeacher();
//   })
// }

// var showTeacherPage = function(teacherID) {
//   ajax request to get the data
//   .then(function(response) {})
// }
