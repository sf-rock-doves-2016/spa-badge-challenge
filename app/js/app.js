miniQuery.ready(function() {
    miniQuery.on('.instructor','click',function(){
      var instr_id = this.id
      miniQuery.request({
        url: 'http://spa-badge-api.herokuapp.com/teachers/' + instr_id,
        type: 'get'
      }).then(function(response){
        console.log(response)
      }).catch(function(error){
        console.log(error)
      })
    })







})


