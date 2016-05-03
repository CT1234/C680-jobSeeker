
module.exports = {
  showPublic: function(req, res) {
   return res.view('publicProfile');
  },
  
  showUser: function(req, res) {
    User.findOne({email: req.param("email")})
      .exec(function (err, finn){
        if (err) {
          return res.negotiate(err);
        }
        if (!finn) {
          return res.notFound('Could not find Finn, sorry.');
        }
        sails.log('Found "%s"', finn.address);
        return res.json(finn.address);
      });
  }
};