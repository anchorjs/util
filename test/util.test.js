define(['util'],
function(util) {

  describe("util", function() {
  
    it('should export inherits', function() {
      expect(util.inherits).to.be.a('function');
    });
    
    it('should export console functions', function() {
      expect(util.log).to.be.a('function');
      expect(util.debug).to.be.a('function');
      expect(util.error).to.be.a('function');
      expect(util.print).to.be.a('function');
      expect(util.puts).to.be.a('function');
    });
    
    describe('.isArray()', function() {
      it('should return true for arrays', function() {
        expect(util.isArray([])).to.be.true;
        expect(util.isArray(new Array())).to.be.true;
      });
    });
    
    describe('.isRegExp()', function() {
      var a = [];
    
      it('should return true for regular expressions', function() {
        expect(util.isRegExp(/foo/)).to.be.true;
        expect(util.isRegExp(new RegExp('foo'))).to.be.true;
      });
    });
    
    describe('.isDate()', function() {
      var a = [];
    
      it('should return true for dates', function() {
        expect(util.isDate(new Date())).to.be.true;
      });
    });
    
    describe('.isError()', function() {
      var a = [];
    
      it('should return true for errors', function() {
        expect(util.isError(new Error('foo'))).to.be.true;
      });
    });

  });

  return { name: "test.util" }
});
