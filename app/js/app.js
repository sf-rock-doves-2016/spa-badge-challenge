

document.addEventListener("DOMContentLoaded", function(event){

  EventDispatcher.on('.teacher','click',function(){

    var name = this.textContent


    AjaxWrapper.request({
      url:'http://spa-badge-api.herokuapp.com/teachers/' + this.getAttribute('id'),
      type: 'GET'
    }).then(function(responseText) {
      DOM.hide('.homepage-content')

      $(function () {
        // Grab the template script
        var theTemplateScript = $("#sample-template").html();

        // Compile the template
        var theTemplate = Handlebars.compile(theTemplateScript);

        // Define our data object
        var context={
          "name": name
        };

        // Pass our data to the template
        var theCompiledHtml = theTemplate(context);

        // Add the compiled html to the page
        $('.sample-placeholder').html(theCompiledHtml);
      });

      var response = JSON.parse(responseText)
      console.log(response)

      $(function () {
        // Grab the template script
        var theTemplateScript = $("#badge-template").html();

        // Compile the template
        var theTemplate = Handlebars.compile(theTemplateScript);

        // Define our data object
        var context={
          "badge": response.badges
        };

        // Pass our data to the template
        var theCompiledHtml = theTemplate(context);

        // Add the compiled html to the page
        $('.badge-placeholder').html(theCompiledHtml);
      });


    }).catch(function() {

    });



  })

})

