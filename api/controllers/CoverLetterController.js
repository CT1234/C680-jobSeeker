/**
 * CoverLetterController
 *
 * @description :: Server-side logic for managing coverletters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
    req.file('coverLetter').upload({
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
      CoverLetter.create({
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

