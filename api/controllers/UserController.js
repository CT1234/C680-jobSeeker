/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
  new: function(req, res) {
    res.view('signup');
  },

	signUp: function(req, res) {
    User.create(req.body).exec(function userCreated(err, user) {
      if(err) {
        console.log(err);
        return res.redirect('/signup');
      } else {
        req.login(user, function(err) {
          if(err) {
            console.log(err);
            return res.redirect('/signup');
          } else {
            res.redirect('/');
          }
        });
      }
    });
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

