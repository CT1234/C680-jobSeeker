var request = require('supertest'),
  should = require('should');

describe('CovertLetterController', function() {
  var agent = request.agent('http://localhost:1337');

  before(function(done) {
    request(sails.hooks.http.app)
        .post('/signup')
        .send({ email: 'test5@test.com', password: '123456' })
        .end(function(err, res) {
            agent
              .post('/login')
              .send({ email: 'test5@test.com', password: '123456' })
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
    it('should allow me to upload a new cover letter', function(done) {
      agent
        .post('/user/coverletter')
        .field('name', 'coverLetter')
        .attach('coverLetter', 'test/fixtures/coverletter.pdf')
        .expect(302)
        .expect('location','/dashboard', done);
    });
  });

});