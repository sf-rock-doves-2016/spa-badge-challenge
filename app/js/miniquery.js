/*!
 * minQuery
 */

// Release 0
var SweetSelector = (function(){

  return {
    select: function(selector) {
      return document.querySelector(selector);
    }
  };
})();

// The SweetSelector module returns a self invoking function called select which takes in a selector as an argument which can be an id, class, type, attribute, etc and outputs the item from the html document that was found.

// Release 1
var DOM = (function(){
  return {
    hide: function(selector){
      var div = SweetSelector.select(selector);
      return div.style.display = 'none';
    },

    show: function(selector){
      var div = SweetSelector.select(selector);
      return div.style.display = 'block';
    },

    addClass: function(selector, newClass){
      var div = SweetSelector.select(selector);
      return div.classList.add(newClass);
    },

    removeClass: function(selector, removingClass){
      var div = SweetSelector.select(selector);
      return div.classList.remove(removingClass);
    }
  };
})();

// The DOM Module has methods hide, show, addClass, and removeClass which allow you to traverse and manipulate the document view and structure


// Release 2
var EventDispatcher = (function(){

  return{
    on: function(namespace, childSelector, anonymousFunction){
      var element = SweetSelector.select(namespace);
      element.addEventListener(childSelector, anonymousFunction);
    },

    trigger: function(namespace, childSelector){
      var event = new Event(childSelector)
      document.dispatchEvent(event);
    }
  }
})();

// The EventDispatcher module has methods to trigger a function execution specified of a specific namespace with selector. The method .on listens for the event, while the method .trigger dispatches the event.

// Release 3
// Courtesy of Thomas
var AjaxWrapper = (function() {
  return {
    request: function(objHash) {
      return new Promise(function(resolve,reject) {
          var oReq = new XMLHttpRequest()
          oReq.open(objHash.type, objHash.url)
          oReq.onload = function() {
          if (this.status >= 200 && this.status < 300) {
            resolve(oReq.response);
          } else {
            reject(oReq.statusText)
          }
        }
        oReq.onerror = function() {
          reject(this.statusText)
        }
          oReq.send(objHash.data);
        })
    }
  }
})();

// The AjaxWrapper module contains a new Promise object to complete an asynchronous XMLHttpRequest which accepts an object Hash containing a url and action type in order to recieve a response of data to be used within your application or rejected if the request encounters an error.



// Release 4-6

// Code below provided by edshadi/miniQuery on Github
var pubSub = (function() {
  var events = {};
  var subscribe = function(target, evt, callback) {
    if (!events[evt]) {
      events[evt] = [];
    }
    var event = document.createEvent("HTMLEvents");
    event.initEvent(evt, true, true);
    event.eventName = evt;

    target.addEventListener(evt, callback, false);
    events[evt].push({ target: target, evt: event });
    return events;
  }

  var publish = function(evt) {
    if (!events[evt]) {
      return false;
    }
    var subscribers = events[evt];

    var len = subscribers.length
    while (len--) {
      var subscriber = subscribers[len];
      subscriber.target.dispatchEvent(subscriber.evt);
    }

  }
  return {
    subscribe: subscribe,
    publish: publish
  };
}());



var miniQuery = (function(pubsub) {
  var _$ = function(selector) {
    var element = document.querySelector(selector);
    if(element) return new MiniQuery(element);
  }

  _$['ajax'] = function(options){
    return new AjaxWrapper(options);
  }

  var AjaxWrapper = function(options) {
    this.xhr = new XMLHttpRequest();
    this.options = options
    this.sendRequest();
    return this.xhr;
  }

  AjaxWrapper.prototype = {
    sendRequest: function() {
      this.xhr.open(this.options['type'], this.options['url'], true)
      this.xhr.send();
      this.handleResponse();
    },
    handleResponse: function() {
      var success = this.options.success || this.transferComplete;
      var fail = this.options.fail || this.transferFailed;
      this.xhr.addEventListener("load", success, false);
      this.xhr.addEventListener("error", fail, false);
    },

    transferComplete: function(evt) {
      console.log('ajax failed');
    },
    transferFailed: function() {
      console.log('ajax failed');
    }
  }

  var MiniQuery = function(element) {
    this.element = element;
  }
  MiniQuery.prototype = {
    show: function() {
      this.element.setAttribute('style', 'display: block;');
    },
    hide: function() {
      this.element.setAttribute('style', 'display: none;');
    },
    addClass: function(name) {
      var klass = this.element.className + ' ' + name;
      this.element.setAttribute('class', klass.trim());
    },
    removeClass: function(name) {
      var klass = this.element.className.replace(name, '').trim();
      this.element.setAttribute('class', klass);
    },
    on: function(topic, callback) {
      pubsub.subscribe(this.element, topic, callback);
      return this;
    },

    trigger: function(topic) {
      pubsub.publish(topic);
    }
  }
  return function(global) {
    global.$ = _$;
  }
}(pubSub));


(function(global, miniQuery) {
  if (!global) throw new Error( "we need a window!" );
  miniQuery(global);
}(window, miniQuery));
