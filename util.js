define(['exports',
        'class'],
function(exports, clazz) {

  // console
  // https://developer.mozilla.org/en-US/docs/DOM/console
  // http://msdn.microsoft.com/library/gg589530
  // http://www.opera.com/dragonfly/documentation/console/
  // http://getfirebug.com/wiki/index.php/Console_API

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'];

  // 26 Feb 16:19:34
  function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()),
                pad(d.getMinutes()),
                pad(d.getSeconds())].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
  }
  
  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }

  exports.log = function(msg) {
    if (typeof msg == 'string') {
      msg = timestamp() + ' - ' + msg;
    }
    
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
  
  exports.debug = function(msg) {
    if (typeof msg == 'string') {
      msg = 'DEBUG: ' + msg;
    }
    
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
  
  exports.error = function(msg) {
    window.console
      && console.error
      && Function.prototype.apply.call(console.error, console, arguments);
  }
  
  exports.print =
  exports.puts = function(va) {
    for (var i = 0, len = arguments.length; i < len; ++i) {
      window.console
        && console.log
        && Function.prototype.apply.call(console.log, console, [String(arguments[i])]);
    }
  }


  // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.
  function isArray(ar) {
    return Array.isArray(ar) ||
           (typeof ar === 'object' && objectToString(ar) === '[object Array]');
  }
  exports.isArray = isArray;
  
  
  function isRegExp(re) {
    return typeof re === 'object' && objectToString(re) === '[object RegExp]';
  }
  exports.isRegExp = isRegExp;
  
  
  function isDate(d) {
    return typeof d === 'object' && objectToString(d) === '[object Date]';
  }
  exports.isDate = isDate;
  
  
  function isError(e) {
    return typeof e === 'object' && objectToString(e) === '[object Error]';
  }
  exports.isError = isError;
  
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }


  exports.inherits = clazz.inherits;

});
