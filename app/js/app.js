// window.onload = teacherList

var teacherList = function () {

  //getting teacher list
  SweetSelector.ajaxClone({
    method: "GET",
    url: 'http://localhost:3000/teachers'
  }).then(function(data){
    var list = SweetSelector.select("#teacher-list");
    var parsedData = JSON.parse(data)

    // appending list to the page
    for ( var i = 0; i < parsedData.length; i++ ) {
      var listItem = document.createElement("li")
      listItem.innerHTML = "<a class='teacher-link' href='" + '/teachers/' + parsedData[i]['id'] + "'>" + parsedData[i]['name'] + "</a>"
      list.appendChild(listItem)
    }

    // binding events to all links
    EventDispatcher.on(".teacher-link", "click", function(event) {
      event.preventDefault();
      // this.href returns link in string format
      SweetSelector.ajaxClone({
          method: "GET",
          url: this.href.replace(/9000/, '3000') // replace localhost 9000 to 3000
      }).then(function(data) {
        var teacherData = JSON.parse(data)
      // empty everything under container div
        var containerDiv = SweetSelector.select('.container')[0];
        while (containerDiv.firstChild) {
            containerDiv.removeChild(containerDiv.firstChild);
        }
      });
  // <div class="container">
  //   <div class="logo">
  //     <h1> SPA Badge </h1>
  //   </div>
  //   <h1>Words To Be Remembered By</h1>
  //   <div class="show-user">
  //     <h2> Walker's Badges </h2>

    })


  })
};

