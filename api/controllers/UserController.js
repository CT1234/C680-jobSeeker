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
        user.password = undefined
        req.login(user, function(err) {
          if(err) {
            console.log(err);
            return res.redirect('/signup');
          } else {
            res.redirect('/dashboard');
          }
        });
      }
    });
  },

  login: function(req, res) {
    passport.authenticate('local', function(err, user) {
      if(err || !user) {
        console.log(err); // will output null if !user instead
        res.redirect('/login');
      } else {
        req.login(user, function(err) {
          if(err) {
            console.log(err);
            res.redirect('/login');
          } else {
            res.redirect('/dashboard');
          }
        })
      }
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

  update: function(req, res) {
    User.update({email: req.user.email},{address: req.body.address}).exec(function(err, updatedUser) {
      if(err) {
        console.log(err);
      }
      res.redirect('/dashboard');
      console.log(updatedUser);
    });
  }
};

