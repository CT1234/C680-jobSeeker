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
          res.redirect('/');
        }
      });
    });
   });
  }
};

