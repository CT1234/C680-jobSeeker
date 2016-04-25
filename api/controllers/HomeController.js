/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  homepage: function(req, res) {
    return res.view('homepage');
  },

  dashboard: function(req, res) {
    User.findOne({email: req.user.email})
      .populate('resumes')
      .populate('coverLetters')
      .populate('profilePics')
      .exec(function(err, user) {
        console.log(user);
        user.password = undefined;
        return res.view('dashboard', {
          user: user,
          resumes: user.resumes,
          coverLetters: user.coverLetters,
          profilePics: user.profilePics
        });
      })
  }
};