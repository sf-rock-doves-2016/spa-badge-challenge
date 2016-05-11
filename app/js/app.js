miniQuery.ready(function() {
    miniQuery.on('.instructor','click',function(){
      console.log('HIT')
      var instructorId = this.id
      miniQuery.request({
        url: 'http://spa-badge-api.herokuapp.com/teachers/' + instructorId,
        type: 'get'
      }).then(function(response){
        // miniQuery.hide('#teacherList')
        console.log(response)
        var teacherJSON = JSON.parse(response)
        var teacherPage = teacherDiv(teacherJSON)
        miniQuery.append('.container', teacherPage)
      }).catch(function(error){
        console.log(error)
      })
    })



    function teacherDiv(jsonObj){
      return "<h1>" + jsonObj.name + "</h1>"
    }



})


