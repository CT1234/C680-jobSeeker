/**
 * JobsControllerController
 *
 * @description :: Server-side logic for managing Jobscontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    add: function(req, res) {
        return res.view('tableInput');
    },

    create: function(req, res) {
        User.findOne({ email: req.user.email }).exec(function(err, user) {
            var params = req.params.all();
            Job.create({
                name: params.name,
                position: params.position,
                dateApplied: params.dateApplied,
                dateInterview: params.dateInterview,
                contact: params.contact,
                phone: params.phone,
                email: params.email,
                applied: params.applied,
                linkedIn: params.linkedIn,
                notes: params.notes,
                owner: user.id
            }).exec(function(err) {
                if (err) {
                    console.log(err);
                    return res.negotiate(err);
                } else {
                    res.redirect('/dashboard');
                }
            })
        })
    },
    
  applications: function(req, res) {
    User.findOne({email: req.user.email})
      .populate('jobs')
      .exec(function(err, user) {
        console.log(user);
        return res.view('table', {
          jobs: user.jobs
        });
      })
  }
};