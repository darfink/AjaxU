// AjaxU jQuery Plugin
(function (factory) {
  if(typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if(typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  var requests = {};

  $.ajaxu = function (uid, options) {
    if(typeof(options) === "undefined") {
      throw ("AjaxU: unique identifier is not provided");
    }

    var clonedOptions = $.extend(true, $.ajaxu.defaults, options);
    var xhr = requests[uid];

    if(xhr && xhr.readyState != 4) {
      if(!clonedOptions.abort) {
        // Return the current request if it's not supposed to be aborted
        return xhr;
      }

      // ... otherwise abort it
      xhr.abort();
    }

    xhr = $.ajax.apply(window, clonedOptions);
    xhr.always(function () { delete requests[uid]; });

    // Return a reference to the new request
    return (requests[uid] = xhr);
  };

  var isRequestRunning = function (uid) {
    return (requests.hasOwnProperty(uid) && requests[uid].readyState != 4);
  };

  var isAnyRequestRunning = function () {
    return requests.some(isRequestRunning);
  };

  $.extend($.ajaxu, {
    defaults: {
      // Abort the current request by default
      abort: true
    },
    isRunning: function (uid) {
      return (uid !== undefined) ? isRequestRunning(uid) : isAnyRequestRunning();
    },
    getRequest: function (uid) {
      if(!uid) throw ("AjaxU: unique identifier is required");
      return requests[uid];
    },
    abort: function (uid) {
      var current = $.ajaxu.getRequest(uid);
      delete requests[uid];

      if(current) {
        current.abort();
      }
    },
    clear: function (uid) {
      if(!uid) {
        requests = [];
      } else {
        delete requests[uid];
      }
    }
  });

  // Add $.postu and $.getu methods
  $.each(['getu', 'postu'], function (i, method) {
    $[method] = function (uid, url, data, callback, type) {
      if($.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      return $.ajaxu(uid, {
        type: method.slice(0, -1),
        url: url,
        data: data,
        success: callback,
        dataType: type
      });
    };
  });
}));
