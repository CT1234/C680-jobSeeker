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
    User.findOne({email: req.user.email})
    .populate('coverLetters')
    .exec(function(err, user) {
      var coverLetterData = {
        name: uploadedFiles[0].filename,
        fileDescriptor: uploadedFiles[0].fd,
        owner: user.id
      }
      if(req.body.letterNotes) {
        coverLetterData.notes = req.body.letterNotes;
      }
      if(!user.coverLetters.length > 0) {
        coverLetterData.default = true;
      }
      CoverLetter.create(coverLetterData)
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
    .populate('coverLetters')
    .exec(function(err, user) {
      if(err) {
        console.log(err);
        return res.negotiate(err);
      }

      if(!user) {
        console.log('show: user not found.');
        return res.notFound();
      }

      if(user.coverLetters.length === 0) {
        console.log('No cover letters.');
        return res.notFound();
      }

      var SkipperDisk = require('skipper-disk'),
          fileAdapter = SkipperDisk();

      user.coverLetters.forEach(function(coverLetter) {
        if(coverLetter.id === req.param('id')) {
          fileAdapter.read(coverLetter.fileDescriptor)
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
    CoverLetter.destroy({id: req.param('id')}).exec(function(err) {
      if(err) {
        console.log(err);
        return res.negotiate(err);
      }

      return res.ok();
    });
  },
  update: function(req, res) {
    CoverLetter.findOne({default: true}).exec(function(err, oldDefault) {
      if(err) {
        return res.negotiate(err);
      }

      if(oldDefault) {
        CoverLetter.update({id: oldDefault.id}, {default: false}).exec(function(err, oldDefault) {
          if(err) {
            return res.negotiate(err);
          }

          CoverLetter.update({id: req.param('id')}, {default: true}).exec(function(err, newDefault) {
            if(err) {
              return res.negotiate(err);
            }

            return res.ok();
          });
        });
      } else {
        CoverLetter.update({id: req.param('id')}, {default: true}).exec(function(err, newDefault) {
          if(err) {
            return res.negotiate(err);
          }

          return res.ok();
        });
      }
    });
  }
};

