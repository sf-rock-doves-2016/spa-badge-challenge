miniQuery.ready(function() {
    miniQuery.on('.instructor','click',function(){
      console.log('HIT')
      var instructor_id = this.id
      miniQuery.request({
        url: 'http://spa-badge-api.herokuapp.com/teachers/' + instructor_id,
        type: 'get'
      }).then(function(response){
        // miniQuery.hide('#teacherList')
        var teacherJSON = JSON.parse(response)
        var teacherPage = teacherDiv(teacherJSON)
        // miniQuery.append('.container', teacherPage)
        miniQuery.select('.container')[0].innerHTML += teacherPage
      }).catch(function(error){
        console.log(error)
      })
    })



    function teacherDiv(json_obj){
      var dom_string = "<div class='teacherPage'><h1>" + json_obj.name + "</h1></div>"

    }



})


