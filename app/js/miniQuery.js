var SweetSelector = (function() {
  var sdfk = "dsfasd";
  return {
    select: function(domObj) {
      if (domObj[0] === ".") {
        domObj = domObj.slice(1);
        return document.getElementsByClassName(domObj);
      }else if (domObj[0] === "#") {
        domObj = domObj.slice(1);
        return document.getElementById(domObj);
      }else if (/^[A-Z]/i.test(domObj[0])) {
        return document.getElementsByTagName(domObj);
      }else {
        throw ("Can't take such input " + domObj);
      }
    },

    ajaxClone: function (inputObject) {
      return new Promise(function(resolve, reject) {
        // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

        function reqListener() {
          var responseBody = this.responseText;
          // var responseBody = "success!";
          if (this.status == 200) {
            resolve(responseBody);
          }else {
            reject(Error(this.statusText));
          }
        };

        var oReq = new XMLHttpRequest();
        oReq.open(inputObject.method, inputObject.url);
        oReq.send();
        oReq.addEventListener("load", reqListener);
      });
    }
  };
})();


var DOM = (function() {
  return {
    hide: function(domObj) {
      var targetObj = SweetSelector.select(domObj);
      if (targetObj.length >= 1) {
        for(var i = 0; i < targetObj.length; i++) {
          targetObj[i].style.display = "none";
        }
      }else {
        targetObj.style.display = "none";
      }
    },
    show: function(domObj) {
      var targetObj = SweetSelector.select(domObj);
      if (targetObj.length >= 1) {
        for(var i = 0; i < targetObj.length; i++) {
          targetObj[i].style.display = "";
        }
      }else {
        targetObj.style.display = "";
      }
    },
    addClass: function(domObj, newClassName) {
      var targetObj = SweetSelector.select(domObj);
      if (targetObj.length >= 1) {
        for(var i = 0; i < targetObj.length; i++) {
          targetObj[i].setAttribute('class', newClassName);
        }
      }else {
        targetObj.setAttribute('class', newClassName);
      }
    },
    removeClass: function(domObj, className) {
      var targetObj = SweetSelector.select(domObj);
      if (targetObj.length >= 1) {
        for(var i = 0; i < targetObj.length; i++) {
          targetObj[i].removeAttribute('class', className);
        }
      }else {
        targetObj.removeAttribute('class', className);
      }
    }
  };
})();


var EventDispatcher = (function() {
  return {
    on: function(domObj, eventName, func) {
      var targetObj = SweetSelector.select(domObj);
      if (targetObj.length >= 1) {
        for(var i = 0; i < targetObj.length; i++) {
          targetObj[i].addEventListener(eventName, func, false);
        }
      }else {
        targetObj.addEventListener(eventName, func, false);
      }
    },
    trigger: function(domObj, eventName) {
      var targetEvent = new Event(eventName);
      var targetObj = SweetSelector.select(domObj);
      if (targetObj.length >= 1) {
        for(var i = 0; i < targetObj.length; i++) {
          targetObj[i].dispatchEvent(targetEvent);
        }
      }else {
        targetObj.dispatchEvent(targetEvent);
      }
    }
  }
})();
