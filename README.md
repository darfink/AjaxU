# AjaxU
## A jQuery plugin for making unique ajax requests

This is a simple plugin provided for use cases where a request is supposed to
be unique. It does this by associating each request with a provided identifier.
If a request is issued whilst one with the same ID is already active, the first
request will be aborted and a new one will be created in its place.

This behavior can also be changed, so that the first request will remain active
whilst the second one will be ignored (see the `abort` option).

A common use case would be a `<form>` element, where the user may click the
submit button multiple times, issuing several requests where only one is
required.

## Usage

`$.ajaxu` follows the [$.ajax](http://api.jquery.com/jQuery.ajax/) options and return value, with an additional first parameter (the unique identifier).

  ```javascript
    $.ajaxu(uid, opts);
  ```

`$.getu` follows the [$.get](http://api.jquery.com/jQuery.get/) options and return value, with an additional first parameter (the unique identifier).

  ```javascript
    $.getu(uid, opts);
  ```

`$.postu` follows the [$.post](http://api.jquery.com/jQuery.post/) options and return value, with an extra first parameter (the unique identifier).

  ```javascript
    $.postu(uid, opts);
  ```

`$.ajaxu.isRunning` returns a boolean representing if a request is currently running. `uid` is an optional parameter.

  ```javascript
    $.ajaxu.isRunning(uid);
  ```

`$.ajaxu.getRequest` returns the active jqXHR request for the given identifier. `uid` is required.

  ```javascript
    $.ajaxu.getRequest(uid);
  ```

`$.ajaxu.clear` removes any unprocessed requests. `uid` is an optional parameter.

  ```javascript
	 $.ajaxu.clear(uid);
  ```

`$.ajaxu.abort` aborts the current request. `uid` is required.

  ```javascript
    $.ajaxu.abort(uid);
  ```

`$.ajaxu.defaults` defines the default options for `$.ajaxu`, where `abort` is true by default.

  ```javascript
    $.ajaxu.defaults = { abort: true };
  ```
