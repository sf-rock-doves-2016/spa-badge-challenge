document.addEventListener("DOMContentLoaded", function(){

  SweetSelector.ajaxClone({
    url:'http://localhost:3000/teachers',
    method: 'GET'
  }).then(function(response){
    var list = SweetSelector.select("#teacher-list");
    var teachers = JSON.parse(response);
    for (var i = 0; i < teachers.length; i++){
      var listItem = document.createElement("li");
      listItem.innerHTML = "<a href='#"+teachers[i].id+"'>"+teachers[i].name+"</a>"
      list.appendChild(listItem);
    }
    EventDispatcher.on('a', 'click', function(e){
      e.preventDefault();
      DOM.hide('.teachers')
      DOM.hide("#teacher-list");
      var teacherID = this.getAttribute('href').slice(1);
      SweetSelector.ajaxClone({
        url:'http://localhost:3000/teachers/' + teacherID,
        method: 'GET'
      }).then(function(response){
        var container = SweetSelector.select("container");

      }).catch(function(error){
        console.log(error);
      });
    });


  }).catch(function(error){
    console.log(error);
  });

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

