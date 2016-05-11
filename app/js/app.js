document.addEventListener("DOMContentLoaded", function(event){

  EventDispatcher.on('.teacher','click',function(){
    var name = this.textContent
    var id = this.getAttribute('id')

    AjaxWrapper.request({
      url:'http://spa-badge-api.herokuapp.com/teachers/' + id,
      type: 'GET'
    }).then(function(responseText) {

      var response = JSON.parse(responseText)
      DOM.hide('.homepage-content')
      console.log(response)

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

      $(function () {
        // Grab the template script
        var theTemplateScript = $("#add-badge-template").html();

        // Compile the template
        var theTemplate = Handlebars.compile(theTemplateScript);

        var context={
          "id": id
        };

        // Pass our data to the template
        var theCompiledHtml = theTemplate(context);

        // Add the compiled html to the page
        $('.badge-add-placeholder').html(theCompiledHtml);
      });

    }).catch(function() {});

  })

  EventDispatcher.on('.submit-form','submit',function(e){

    e.preventDefault();

    console.log("Is it getting here?")

    var form = this
    console.log("below is form")
    console.log(form)
    var data = new FormData(form);
    console.log(data)

    AjaxWrapper.request({
        url:'http://spa-badge-api.herokuapp.com/badges',
        type: 'POST'
        // data: {
        //   phrase: ,
        //   teacher_id: ,
        //   votes: ,
        // }
      }).then(function(responseText) {

        // var response = JSON.parse(responseText)

        // DOM.hide('.homepage-content')

        // $(function () {
        //   // Grab the template script
        //   var theTemplateScript = $("#sample-template").html();

        //   // Compile the template
        //   var theTemplate = Handlebars.compile(theTemplateScript);

        //   // Define our data object
        //   var context={
        //     "name": name
        //   };

        //   // Pass our data to the template
        //   var theCompiledHtml = theTemplate(context);

        //   // Add the compiled html to the page
        //   $('.sample-placeholder').html(theCompiledHtml);
        // });

      }).catch(function() {})

  })

})

