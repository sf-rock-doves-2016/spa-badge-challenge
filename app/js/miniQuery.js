// var SweetSelector = (function () {

//   this.selector = function(input) {
//     if (input.includes('#')) {
//       return document.getElementById(input.substr(1, input.length));
//     } else if (input.includes('.')) {
//       return document.getElementsByClassName(input.substr(1, input.length));
//     } else {
//       return document.getElementsByTagName(input);
//     }
//   }
//   return {
//     select: selector
//   }
// })();

// var DOM = (function () {

//   this.hider = function(input){
//     return SweetSelector.select(input).style.visibility = "hidden"
//   };

//   this.shower = function(input){
//     return SweetSelector.select(input).style.visibility = "visible"
//   };

//   this.classAdder = function(selector, add_class){
//     var ary = SweetSelector.select(selector)
//     for (var i=0; i<ary.length; i++){
//       ary[i].className += " " + add_class
//     }
//     return ary
//   }

//   this.classRemover = function(selector, remove_class){
//     var ary = SweetSelector.select(selector)
//     for (var i=0; i<ary.length; i++){
//       ary[i].className = ary[i].className.replace(remove_class, "")
//     }
//     return ary
//   }

//   return {
//     hide: hider,
//     show: shower,
//     addClass: classAdder,
//     removeClass: classRemover
//   };

// })();

// var EventDispatcher = (function () {

//   this.on = function(target, event, callback){
//     var tarObj = SweetSelector.select(target)

//     console.log(tarObj)
//     console.log(tarObj.length)
//     if (tarObj.length){
//       for (var i = 0; i < tarObj.length; i++){
//         tarObj[i].addEventListener(event, callback)
//       }
//     } else {
//       tarObj.addEventListener(event, callback)
//     }
//   }

//   this.trigger = function(target, event_type){
//     var tarObj = SweetSelector.select(target)
//     var event = new Event(event_type)
//     if (tarObj.length){
//       for (var i = 0; i < tarObj.length; i++){
//         tarObj[i].dispatchEvent(event)
//       }
//     } else {
//       tarObj.dispatchEvent(event)
//     }
//   }

//   return {
//     on: on,
//     trigger: trigger
//   }

// })();

//OLD JS
// Release 0: A selector library

var SweetSelector = (function(){

  this.select = function(element){

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
  return {
    select: select
  }
})();

// Release 1: DOM Manipulation

var DOM = (function(){

  this.hide = function(element){
    var item = SweetSelector.select(element);
    for(var i = 0; i < item.length; i++){
      item[i].style.display = "none";
    }
  }

  this.show = function(element){
    var item = SweetSelector.select(element);
    for(var i = 0; i < item.length; i++){
      item[i].style.display = "block";
    }
  }

  // this.addClass = function(target, change){
  //   var item = SweetSelector.select(target);
  //   for(var i = 0; i < item.length; i++){
  //     item[i].className += " " + change;
  //   }
  // }

  // this.removeClass = function(target, change){
  //   var item = SweetSelector.select(target);
  //   for(var i = 0; i < item.length; i++){
  //     var classArray = item[i].className.split(" ")
  //     for(var j = 0; j < classArray.length; j++){
  //       if(classArray[j]===change){
  //         classArray[j]=""
  //       }
  //     }
  //     var newClass = classArray.join(" ")
  //     item[i].className = newClass
  //   }

  // }

  this.addClass = function(target, change){
    var item = SweetSelector.select(target);
    for(var i = 0; i < item.length; i++){
      item[i].classList.add(change)
    }
  }

  this.removeClass = function(target, change){
    var item = SweetSelector.select(target);
    for(var i = 0; i < item.length; i++){
      item[i].classList.remove(change)
    }
  }

  return {
    hide: hide,
    show: show,
    addClass: addClass,
    removeClass: removeClass
  }

})();

//Release 2: Event dispatch

var EventDispatcher = (function(){

  this.on = function(element, eventName, fn) {
    var item = SweetSelector.select(element);
    console.log(item)
    console.log(item.length)
    for (var i = 0; i < item.length; i++) {
      console.log(item[i])
      item[i].addEventListener(eventName, fn, false);
    }
  }

  this.trigger = function(element, eventName) {
    var item = SweetSelector.select(element);
    for (var i = 0; i < item.length; i++) {
      item[i].dispatchEvent(eventName);
    }
  }

  return {
    on: on,
    trigger: trigger
  }

})();

//Release 3: Ajax

var AjaxWrapper = (function(){

  this.request = function(data) {

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

  return {
    request: request,
  }

})();

// AjaxWrapper.request({
//  url: 'someurl',
//  type: 'GET'
// }).then(function(response) {
//   // Handle data returned from the Promise
// }).catch(function(error) {
//   // Handle data returned from the Promise
// });



