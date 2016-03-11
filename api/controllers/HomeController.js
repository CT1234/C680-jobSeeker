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
      .exec(function(err, user) {
        console.log(user);
        user.password = undefined;
        return res.view('dashboard', {
          resumes: user.resumes,
          coverLetters: user.coverLetters
        });
      })
  }
};