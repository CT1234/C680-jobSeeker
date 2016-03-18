/**
 * JobsControllerController
 *
 * @description :: Server-side logic for managing Jobscontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    new: function(req, res) {
        return res.view('jobApplicationForm');
    },

    create: function(req, res) {
        User.findOne({ email: req.user.email }).exec(function(err, user) {
            Job.create(req.body).exec(function(err) {
                if (err) {
                    console.log(err);
                    return res.negotiate(err);
                } else {
                    res.redirect('/dashboard');
                }
            })
        });
    },
    
    applications: function(req, res) {
        User.findOne({email: req.user.email})
        .populate('jobs')
        .exec(function(err, user) {
            console.log(user);
            return res.view('table', {
                        jobs: user.jobs
            });
        });
    }
};