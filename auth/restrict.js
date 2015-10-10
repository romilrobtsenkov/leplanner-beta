module.exports = function(req, res, next) {

  // check if same user as in session, when saving content to user profile
  if(typeof req.body.user !== 'undefined' && typeof req.body.user._id !== 'undefined'){
    //console.log('check');
    //console.log(req.session.passport.user._id);
    if(req.body.user._id != req.session.passport.user._id){
      //console.log("new user:"+req.body.user._id+" changed old user:"+req.session.passport.user._id);
      return res.json({error: {id: 100, message: "refresh page, user changed"}});
    }
  }

  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');

};
