var request = require('supertest'),
  should = require('should');

describe('ResumeController', function() {
  var agent = request.agent('http://localhost:1337');

  before(function(done) {
    request(sails.hooks.http.app)
        .post('/signup')
        .send({ email: 'test3@test.com', password: '123456' })
        .end(function(err, res) {
            agent
              .post('/login')
              .send({ email: 'test3@test.com', password: '123456' })
              .end(function(err, res) {
                if(err) {
                  return done(err);
                }
                done();
              });
        });
  });

  after(function(done) {
    agent
      .get('/logout')
      .end(function(err, res) {
        if(err) {
          return done(err);
        }

        done();
      });
  });

  describe('#create()', function() {
    it('should allow me to upload a new resume', function(done) {
      agent
        .post('/user/resume')
        .field('name', 'resume')
        .attach('resume', 'test/fixtures/resume.pdf')
        .expect(302)
        .expect('location','/dashboard', done);
    });
  });

});