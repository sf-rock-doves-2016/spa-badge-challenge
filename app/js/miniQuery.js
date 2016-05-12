var SweetSelector = (function() {
  this.select = function(element) {
    if (element.includes('#')) {
      return document.getElementById(element.slice(1));
    }
    else if (element.includes('.')) {
      return document.getElementsByClassName(element.slice(1));
    }
    else {
      return ("Element not found.");
    }
  }
  return {
    select: select
  }
})();

var DOM = (function(){

  this.hide = function(element) {
    if (element.includes('#')) {
      var desired_id = document.getElementById(element.slice(1));
      desired_id.style.display = "none";
    }
    else if (element.includes('.')) {
      var desired_class = document.getElementsByClassName(element.slice(1));
      for (var i = 0; i < desired_class.length; i++) {
        desired_class[i].style.display = "none";
      }
    }
    else {
      return ("Element not found.");
    }
  }

  this.show = function(element) {
    if (element.includes('#')) {
      var desired_id = document.getElementById(element.slice(1));
      desired_id.style.display = "block";
    }
    else if (element.includes('.')) {
      var desired_class = document.getElementsByClassName(element.slice(1));
      for (var i = 0; i < desired_class.length; i++) {
        desired_class[i].style.display = "block";
      }
    }
    else {
      return ("Element not found.");
    }
  }

  this.addClass = function(element, class_name) {
    if (element.includes('#')) {
      var desired_id = document.getElementById(element.slice(1));
      desired_id.setAttribute("class", class_name);
    }
    else if (element.includes('.')) {
      var desired_class = document.getElementsByClassName(element.slice(1));
      for (var i = 0; i < desired_class.length; i++) {
        desired_class[i].setAttribute("class", class_name);
      }
    }
    else {
      return ("Element not found.");
    }
  }

  return {
    hide: hide,
    show: show,
    addClass: addClass,
  }

})();

var EventDispatcher = (function(){

  this.on = function(element, event, func) {
    var theEvent = new Event(event)
    var desired_class = SweetSelector.select(element);
      for (var i = 0; i < desired_class.length; i++) {
        desired_class[i].addEventListener(event, func, false);
      }
    }

  this.trigger = function(element, event) {
      var theEvent = new Event(event)
      var desired_class = SweetSelector.select(element);
      for (var i = 0; i < desired_class.length; i++) {
        desired_class[i].dispatchEvent(theEvent);
      }
    }

  return {
    on: on,
    trigger: trigger
  }
})();

var AjaxWrapper = (function(){

  this.request = function(data) {

  var promise = new Promise( function (resolve, reject){
    var client = new XMLHttpRequest();
    var uri = data.url

    client.open(data.type, uri);
    client.send();

    client.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };

    client.onerror = function () {
      reject(this.statusText);
    };
  });
  return promise
}

return {
  request: request,
}

}());


