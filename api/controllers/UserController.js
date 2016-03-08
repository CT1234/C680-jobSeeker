/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
	signUp: function(req, res) {
    console.log(req.body);
  },

  login: function(req, res) {
    passport.authenticate('local', function(err, user) {
      if(err || !user) {
        console.log(err);
        res.redirect('/login');
      } else {
        req.login(user, function(err) {
          if(err) {
            console.log(err);
            res.redirect('/login');
          } else {
            res.redirect('/');
          }
        })
      }
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};

