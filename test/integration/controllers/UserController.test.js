var request = require('supertest'),
  should = require('should');

describe('UserController', function() {
  describe('#signUp()', function() {
    it('should redirect to /dashboard', function (done) {
      request(sails.hooks.http.app)
        .post('/signup')
        .send({ email: 'test1@test.com', password: '123456' })
        .expect(302)
        .expect('location','/dashboard', done);
    });
  });

  describe('#login()', function() {
    it('should redirect to /dashboard', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'test1@test.com', password: '123456' })
        .expect(302)
        .expect('location','/dashboard', done);
    });
  });

  describe('unauthenticated', function() {
    it('should redirect to login if youre not logged in', function(done) {
      request(sails.hooks.http.app)
        .get('/dashboard')
        .expect(302)
        .expect('location','/login',done);
    });
  });

});