var selenium = require('selenium-webdriver'),
    should = require('should'),
    chromedriver = require('chromedriver'),
    driver;

before(function(done) {
  driver = new selenium.Builder()
    .withCapabilities(selenium.Capabilities.chrome())
    .build();

  driver.get('http://localhost:1337').then(done);
});

after(function(done) {
  driver.quit().then(done);
});

describe('Logging in', function() {
  beforeEach(function() {
    driver.get ('http://localhost:1337');
  });

  it('should open the login page', function(done) {
    driver.getCurrentUrl().then(function(value) {
     (value).should.equal('http://localhost:1337/login');
     done();
    });
  });
});