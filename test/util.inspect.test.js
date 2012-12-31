define(['util'],
function(util) {

  // https://github.com/joyent/node/blob/master/test/simple/test-util-inspect.js

  describe("util.inspect", function() {

    it('sparse array', function() {
      var a = ['foo', 'bar', 'baz'];
      expect(util.inspect(a)).to.equal('[ \'foo\', \'bar\', \'baz\' ]');
      delete a[1];
      expect(util.inspect(a)).to.equal('[ \'foo\', , \'baz\' ]');
      expect(util.inspect(a, true)).to.equal('[ \'foo\', , \'baz\', [length]: 3 ]');
      expect(util.inspect(new Array(5))).to.equal('[ , , , ,  ]');
    });
    
    it('property descriptors', function() {
      var getter = Object.create(null, {
        a: {
          get: function() { return 'aaa'; }
        }
      });
      var setter = Object.create(null, {
        b: {
          set: function() {}
        }
      });
      var getterAndSetter = Object.create(null, {
        c: {
          get: function() { return 'ccc'; },
          set: function() {}
        }
      });
    
      expect(util.inspect(getter, true)).to.equal('{ [a]: [Getter] }');
      expect(util.inspect(setter, true)).to.equal('{ [b]: [Setter] }');
      expect(util.inspect(getterAndSetter, true)).to.equal('{ [c]: [Getter/Setter] }');
    });
    
    it('exceptions should print the error message, not "{}"', function() {
      //expect(util.inspect(new Error())).to.equal('[Error]');
      expect(util.inspect(new Error())).to.include('[Error');
      expect(util.inspect(new Error('FAIL'))).to.equal('[Error: FAIL]');
      expect(util.inspect(new TypeError('FAIL'))).to.equal('[TypeError: FAIL]');
      expect(util.inspect(new SyntaxError('FAIL'))).to.equal('[SyntaxError: FAIL]');
      try {
        undef();
      } catch (e) {
        expect(util.inspect(e)).to.contain('[ReferenceError: ');
      }
      
      var ex = util.inspect(new Error('FAIL'), true);
      expect(ex).to.contain('[Error: FAIL]');
      //assert.ok(ex.indexOf('[stack]') != -1);
      //assert.ok(ex.indexOf('[message]') != -1);
      //assert.ok(ex.indexOf('[arguments]') != -1);
      //assert.ok(ex.indexOf('[type]') != -1);
    });
    
    it('GH-1941', function() {
      expect(util.inspect(Object.create(Date.prototype))).to.equal('{}');
    });
    
    it('GH-1944', function() {
      expect(function() {
        var d = new Date();
        d.toUTCString = null;
        util.inspect(d);
      }).to.not.throw();
      
      expect(function() {
        var r = /regexp/;
        r.toString = null;
        util.inspect(r);
      }).to.not.throw();
    });
    
    it('bug with user-supplied inspect function returns non-string', function() {
      expect(function() {
        util.inspect([{
          inspect: function() { return 123; }
        }]);
      }).to.not.throw();
    });
    
    it('GH-2225', function() {
      var x = { inspect: util.inspect };
      expect(util.inspect(x)).to.contain('inspect');
    });
    
    it('an object with "hasOwnProperty" overwritten should not throw', function() {
      expect(function() {
        util.inspect({
          hasOwnProperty: null
        });
      }).to.not.throw();
    });
    
    it('new API, accepts an "options" object', function() {
      var subject = { foo: 'bar', hello: 31, a: { b: { c: { d: 0 } } } };
      Object.defineProperty(subject, 'hidden', { enumerable: false, value: null });
    
      expect(util.inspect(subject, { showHidden: false })).to.not.contain('hidden');
      expect(util.inspect(subject, { showHidden: true })).to.contain('hidden');
      expect(util.inspect(subject, { depth: 2 })).to.contain('c: [Object]');
      expect(util.inspect(subject, { depth: 0 })).to.contain('a: [Object]');
      expect(util.inspect(subject, { depth: null })).to.contain('{ d: 0 }');
    });
    
    it('"customInspect" option can enable/disable calling inspect() on objects', function() {
      var subject = { inspect: function() { return 123; } };
    
      expect(util.inspect(subject, { customInspect: true })).to.contain('123');
      expect(util.inspect(subject, { customInspect: true })).to.not.contain('inspect');
      expect(util.inspect(subject, { customInspect: false })).to.not.contain('123');
      expect(util.inspect(subject, { customInspect: false })).to.contain('inspect');
    });
    
  });
  
  return { name: "test.util.inspect" }
});
