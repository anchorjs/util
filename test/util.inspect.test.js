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
      expect(util.inspect(new Error())).to.equal('[Error: ]');
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
    
  });
  
  return { name: "test.util.inspect" }
});
