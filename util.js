define(['exports',
        'class'],
function(exports, clazz) {

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
