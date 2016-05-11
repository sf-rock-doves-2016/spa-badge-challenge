miniQuery.ready(function() {

    miniQuery.on('.instructor','click',function(){
      var instructorId = this.id
      miniQuery.request({
        url: 'http://spa-badge-api.herokuapp.com/teachers/' + instructorId,
        type: 'get'
      }).then(function(response){
        // miniQuery.hide('#teacherList')
        var teacherJSON = JSON.parse(response)
        teacherPageCreate(teacherJSON)
        // var teacherPage = teacherDiv(teacherJSON)
        // miniQuery.append('.container', teacherPage)
        // miniQuery.append('.container', homeButton())
        homeListener()
      }).catch(function(error){
        console.log(error)
      })
    })

    function teacherDiv(jsonObj){
      return "<h1>" + jsonObj.name + "</h1><a class='homeButton' href='#'>HOME</a>"
    }




    function homeListener(){
      miniQuery.on('.homeButton', 'click', function(){
        miniQuery.remove('.teacherPage')
      })
    }

    function teacherPageCreate(jsonObj) {
      console.log(miniQuery.select("#teacherPageTemplate")[0].innerHTML)
      var theTemplateScript = miniQuery.select("#teacherPageTemplate")[0].innerHTML;
      var theTemplate = Handlebars.compile(theTemplateScript);
      var context = {
        "name": jsonObj.name
      };
      var theCompiledHtml = theTemplate(context);
      miniQuery.append('.content-placeholder',theCompiledHtml);
    };

})


