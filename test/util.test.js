define(['util'],
function(util) {

  describe("util", function() {

    it('should export inherits', function() {
      expect(util.inherits).to.be.a('function');
    });

  });

  return { name: "test.util" }
});
