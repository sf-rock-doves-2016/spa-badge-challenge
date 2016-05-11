//OLD JS
// Release 0: A selector library

var miniQuery = (function(){

  var exports = {}

  exports.select = function(element){
    if(element.charAt(0) === "#"){
      var idsArray = []
      idsArray.push(document.getElementById(element.substring(1)))
      return idsArray
    } else if(element.charAt(0) === "."){
      return document.getElementsByClassName(element.substring(1))
    } else{
      return document.getElementsByTagName(element)
    }
  }

  exports.hide = function(element){
    var item = this.select(element);
    for(var i = 0; i < item.length; i++){
      item[i].style.display = "none";
    }
  }

  exports.show = function(element){
    var item = this.select(element);
    for(var i = 0; i < item.length; i++){
      item[i].style.display = "block";
    }
  }


  exports.addClass = function(target, change){
    var item = this.select(target);
    for(var i = 0; i < item.length; i++){
      item[i].classList.add(change)
    }
  }

  exports.removeClass = function(target, change){
    var item = this.select(target);
    for(var i = 0; i < item.length; i++){
      item[i].classList.remove(change)
    }
  }

//Release 2: Event dispatch

  exports.on = function(element, eventName, fn) {
    var item = this.select(element);
    for (var i = 0; i < item.length; i++) {
      item[i].addEventListener(eventName, fn, false);
    }
  }

  exports.trigger = function(element, eventName) {
    var item = this.select(element);
    for (var i = 0; i < item.length; i++) {
      item[i].dispatchEvent(eventName);
    }
  }

//Release 3: Ajax/

  exports.request = function(data) {

    var promise = new Promise( function (resolve, reject) {

        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();
        var uri = data.url;

        client.open(data.type, uri);
        client.send();

        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            // Performs the function "resolve" when this.status is equal to 2xx
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.statusText);
          }
        };

        client.onerror = function () {
          reject(this.statusText);
        };

      });

      // Return the promise
      return promise;

  }

  exports.ready = function(fn){
    document.addEventListener("DOMContentLoaded", function() {
      fn()
    });
  }

  exports.append = function(container, strObj){
    // The innerHTML method overwrites the existing anchor tags. This clears any event listeners. Needs to be converted to .appendChild.
    var parentObj = miniQuery.select(container)[0]
    var newDiv = document.createElement('div')
    newDiv.innerHTML = strObj
    newDiv.classList.add('teacherPage')
    parentObj.appendChild(newDiv)
  }

  return exports

})();

// AjaxWrapper.request({
//  url: 'someurl',
//  type: 'GET'
// }).then(function(response) {
//   // Handle data returned from the Promise
// }).catch(function(error) {
//   // Handle data returned from the Promise
// });
