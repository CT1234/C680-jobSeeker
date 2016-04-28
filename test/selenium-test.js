var selenium = require('selenium-webdriver'),
    should = require('should'),
    chromedriver = require('chromedriver'),
    By = require('selenium-webdriver').By,
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

describe('Logging in:', function() {
  beforeEach(function() {
    driver.get ('http://localhost:1337');
  });

  it('should be able to login', function(done) {
    driver.findElement(By.name('email')).sendKeys('test@test.com');
    driver.findElement(By.name('password')).sendKeys('123456');
    driver.findElement(By.className('btn-default')).click();
    driver.getCurrentUrl().then(function(value) {
     (value).should.equal('http://localhost:1337/dashboard');
     done();
    });
  });
});