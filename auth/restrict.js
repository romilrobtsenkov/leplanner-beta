module.exports = function(req, res, next) {
  if(typeof req.body.user !== 'undefined' && typeof req.body.user._id !== 'undefined'){
    // check if same user as in session, when saving content to user profile
    console.log('check');
    if(req.body.user._id != req.user._id){
      return res.json({error: {id: 100, message: "refresh page, user changed"}});
    }
  }

  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');

};
