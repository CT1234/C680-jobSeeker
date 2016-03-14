/**
 * ProfilePicController
 *
 * @description :: Server-side logic for managing profile picss
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
    req.file('profilePic').upload({
     maxBytes: 10000000, 
        saveAs: function(file, cb) {
    cb(null, "myPic.jpg");      
  },
        dirname: '../../assets/images/' 
   }, function whenDone(err, uploadedFiles) {
    if(err) {
      console.log(err);
      return res.negotiate(err);
    }

    if(uploadedFiles.length === 0) {
      return res.badRequest('No file was uploaded');
    }
    User.findOne({email: req.user.email}).exec(function(err, user) {
      ProfilePic.create({
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
    .populate('profilePics')
    .exec(function(err, user) {
      if(err) {
        console.log(err);
        return res.negotiate(err);
      }

      if(!user) {
        console.log('show: user not found.');
        return res.notFound();
      }

      if(user.profilePics.length === 0) {
        console.log('No profile pics.');
        return res.notFound();
      }

      var SkipperDisk = require('skipper-disk'),
          fileAdapter = SkipperDisk();

      user.profilePics.forEach(function(profilePic) {
        if(profilePic.id === req.param('id')) {
          fileAdapter.read(profilePic.fileDescriptor)
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
    ProfilePic.destroy({id: req.param('id')}).exec(function(err) {
      if(err) {
        console.log(err);
        return res.negotiate(err);
      }

      return res.ok();
    });
  }
};

