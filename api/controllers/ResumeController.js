/**
 * ResumeController
 *
 * @description :: Server-side logic for managing resumes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
    req.file('resume').upload({
     maxBytes: 10000000 
   }, function whenDone(err, uploadedFiles) {
    if(err) {
      console.log(err);
      return res.negotiate(err);
    }

    if(uploadedFiles.length === 0) {
      return res.badRequest('No file was uploaded');
    }
    User.findOne({email: req.user.email}).exec(function(err, user) {
      Resume.create({
        name: uploadedFiles[0].filename,
        fileDescriptor: uploadedFiles[0].fd,
        owner: user.id
      })
      .exec(function(err) {
        if(err) {
          console.log(err);
          return res.negotiate(err);
        } else {
          res.redirect('/dashboard');
        }
      });
    });
   });
  },
  show: function(req, res) {
    req.validate({
      id: 'string'
    });

    User.findOne({email: req.user.email})
    .populate('resumes')
    .exec(function(err, user) {
      if(err) {
        console.log(err);
        return res.negotiate(err);
      }

      if(!user) {
        console.log('show: user not found.');
        return res.notFound();
      }

      if(user.resumes.length === 0) {
        console.log('No resumes');
        return res.notFound();
      }

      var SkipperDisk = require('skipper-disk'),
          fileAdapter = SkipperDisk();

      user.resumes.forEach(function(resume) {
        if(resume.id === req.param('id')) {
          fileAdapter.read(resume.fileDescriptor)
          .on('error', function(err) {
            console.log(err);
            return res.serverError(err);
          })
          .pipe(res);
        }
      });
    });
  },
  destroy: function(req, res) {
    Resume.destroy({id: req.param('id')}).exec(function(err) {
      if(err) {
        console.log(err);
        return res.negotiate(err);
      }

      return res.ok();
    });
  }
};

