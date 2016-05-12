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
          // parse data
          var teacherData = JSON.parse(data)
          console.log(data)
        // empty everything under container div
        var containerDiv = SweetSelector.select('.container')[0];
        DOM.hide('#teacher-list-header')
        DOM.hide('#teacher-list')
        // show badge page
      var mainHeader = document.createElement("h1");
      mainHeader.innerHTML = "Words To Be Remembered By";
      containerDiv.appendChild(mainHeader);

      var showUser = document.createElement('div')
      showUser.innerHTML = "<h2> " + teacherData['name'] + "'s Badges </h2>"
      containerDiv.appendChild(showUser);

      var badges = teacherData['badges']

      for(var i = 0; i < badges.length; i++) {
        var badgeListItem = document.createElement('div')
        badgeListItem.innerHTML = "<div class='badge-body'>" + (i+1) + ") " + badges[i]['title'] + "</div>"
        showUser.appendChild(badgeListItem);
      }

      var homeButton = document.createElement("div");
      homeButton.innerHTML = "<span class='nav-link'><a id='home-button' href='#'> HOME </a></span></div>";
      containerDiv.appendChild(homeButton);

      function goHome(event) {
        event.preventDefault();
        teacherList();
      }

      EventDispatcher.on("#home-button", "click", goHome);


    });
      })
  })
};


