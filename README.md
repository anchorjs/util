# Anchor/Utilities

The util module provides utilities to the Anchor platform.

## Install

##### volo

    $ volo add anchorjs/util

For more information on using volo to manage JavaScript modules, visit [http://volojs.org/](http://volojs.org/).

## Usage

#### Formatting Strings

Build a formatted string using the first argument as a printf-like format.

```javascript
util.format('%s %d', 'hello', 32);  // 'hello 32'
```

#### Console Logging

```javascript
util.log('message');
// => 30 Dec 22:34:31 - message

util.debug('message');
// => DEBUG: message

util.error('message');
// => message

util.puts('message');
// => message
```

#### Inspecting Objects

Build a string representation of object, which is useful for debugging.

```javascript
console.log(util.inspect(util, true, null));
```

#### Type Checking

Check if an object is of a particular type.

```javascript
util.isArray([]);

util.isRegExp(/some regexp/);

util.isDate(new Date());

util.isError(new Error());
```

#### Class Inheritance

Inherit the prototype methods from one constructor into another.

```javascript
function MyStream() {
  events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);
```

## Implements

This module conforms to the interface exported by Node's [Utilities](http://nodejs.org/api/util.html)
module.

## Tests

##### Browser

To run tests in a browser, execute the Make target for the desired browser:

    $ make test-chrome
    $ make test-firefox
    $ make test-safari

##### PhantomJS

To run headless tests from a terminal using [PhantomJS](http://phantomjs.org/):

    $ make test-phantomjs

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>  
Copyright Joyent, Inc. and other Node contributors.
