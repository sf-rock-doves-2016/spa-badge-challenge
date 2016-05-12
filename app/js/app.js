window.onload = function(){

  window.onhashchange = function(){

    EventDispatcher.on('.teacher', 'click', function(e){
      console.log(this);
      e.preventDefault();

      DOM.hide('.list')
      DOM.show('.return')

      AjaxWrapper.request({

       url: 'http://spa-badge-api.herokuapp.com/teachers/' + this.getAttribute('id'),
       type: 'GET',
      }).then(function(response) {
        var teacher = JSON.parse(response)
        var theTemplateScript = SweetSelector.select("#example-template")
        var template = theTemplateScript.textContent;

        // Compile the template
        var theTemplate = Handlebars.compile(template);

        // Pass our data to the template
        var theCompiledHtml = theTemplate(teacher);

        // Add the compiled html to the page
        (document.body).innerHTML += theCompiledHtml;

          EventDispatcher.on('.return', 'click', function(){

            DOM.show('.list')
            DOM.hide('.template')
            DOM.hide('.return')

          });

      }).catch(function(error) {
        console.log(error)
      });
    });
  };
};


