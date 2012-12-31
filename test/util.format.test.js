define(['util'],
function(util) {

  // https://github.com/joyent/node/blob/master/test/simple/test-util-format.js

  describe("util.format", function() {

    it('should format correctly', function() {
      expect(util.format()).to.equal('');
      expect(util.format('')).to.equal('');
      expect(util.format([])).to.equal('[]');
      expect(util.format({})).to.equal('{}');
      expect(util.format(null)).to.equal('null');
      expect(util.format(true)).to.equal('true');
      expect(util.format(false)).to.equal('false');
      expect(util.format('test')).to.equal('test');
      
      expect(util.format('foo', 'bar', 'baz')).to.equal('foo bar baz');
      
      expect(util.format('%d', 42.0)).to.equal('42');
      expect(util.format('%d', 42)).to.equal('42');
      expect(util.format('%s', 42)).to.equal('42');
      expect(util.format('%j', 42)).to.equal('42');
      
      expect(util.format('%d', '42.0')).to.equal('42');
      expect(util.format('%d', '42')).to.equal('42');
      expect(util.format('%s', '42')).to.equal('42');
      expect(util.format('%j', '42')).to.equal('"42"');
      
      expect(util.format('%%s%s', 'foo')).to.equal('%sfoo');
      
      expect(util.format('%s')).to.equal('%s');
      expect(util.format('%s', undefined)).to.equal('undefined');
      expect(util.format('%s', 'foo')).to.equal('foo');
      expect(util.format('%s:%s')).to.equal('%s:%s');
      expect(util.format('%s:%s', undefined)).to.equal('undefined:%s');
      expect(util.format('%s:%s', 'foo')).to.equal('foo:%s');
      expect(util.format('%s:%s', 'foo', 'bar')).to.equal('foo:bar');
      expect(util.format('%s:%s', 'foo', 'bar', 'baz')).to.equal('foo:bar baz');
      expect(util.format('%%%s%%', 'hi')).to.equal('%hi%');
      expect(util.format('%%%s%%%%', 'hi')).to.equal('%hi%%');
    });
    
  });
  
  return { name: "test.util.format" }
});
