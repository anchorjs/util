define(['require',
        'mocha',
        'chai',
        'mocha-cloud'],
function(require, mocha, chai, cloud) {
  mocha.setup('bdd');
  expect = chai.expect
  
  require(['test/util.test',
           'test/util.format.test',
           'test/util.inspect.test'],
  function() {
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { cloud(mocha.run()); }
  });
});
