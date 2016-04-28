var selenium = require('selenium-webdriver'),
    should = require('should'),
    chromedriver = require('chromedriver'),
    By = require('selenium-webdriver').By,
    driver,
    userInfo = { 
      email: 'test' + Math.round(Math.random()*10) + 1 + '@test.com',
      password: '123456'
    };

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

  it('should be able to signup', function(done) {
    driver.findElement(By.linkText('Sign up now!')).click();
    driver.findElement(By.name('email')).sendKeys(userInfo.email);
    driver.findElement(By.name('password')).sendKeys(userInfo.password);
    driver.findElement(By.className('btn-default')).click();
    driver.getCurrentUrl().then(function(value) {
      (value).should.equal('http://localhost:1337/dashboard');
      done();
    });
  });

  it('should be able to logout', function(done) {
    driver.findElement(By.css('a[href="/logout"]')).sendKeys(selenium.Key.ENTER);
    driver.getCurrentUrl().then(function(value) {
      (value).should.equal('http://localhost:1337/login');
      done();
    });
  });

  it('should be able to login', function(done) {
    driver.findElement(By.name('email')).sendKeys(userInfo.email);
    driver.findElement(By.name('password')).sendKeys(userInfo.password);
    driver.findElement(By.className('btn-default')).click();
    driver.getCurrentUrl().then(function(value) {
     (value).should.equal('http://localhost:1337/dashboard');
     done();
    });
  });
});