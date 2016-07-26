module.exports = function(req, res, next) {

  // check if same user as in session, when saving content to user profile
  if(req.body.user && req.body.user._id){
    //console.log('check ' + req.body.user._id);
    if(req.body.user._id !== req.user._id.toString()){
      // console.log("new user:"+req.body.user._id+" changed old user:"+req.user._id);
      return res.status(403).send("refresh page, user changed");
    }
  }

  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');

};
