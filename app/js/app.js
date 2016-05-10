

document.addEventListener("DOMContentLoaded", function(event){

  EventDispatcher.on('.teacher','click',function(){

    var name = this.textContent
    console.log(this.getAttribute('id'));

    AjaxWrapper.request({
      url:'http://spa-badge-api.herokuapp.com/teachers/' + this.getAttribute('id'),
      type: 'GET'
    }).then(function() {
      console.log("it worked");
    }).catch(function() {
      console.log("nope");
    });

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
      $('.content-placeholder').html(theCompiledHtml);
    });


  })

})

