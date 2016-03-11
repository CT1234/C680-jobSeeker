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
      .exec(function(err, user) {
        user.password = undefined;
        return res.view('dashboard', {
          resumes: user.resumes
        });
      })
  }
};