const authenticated = (req, res, next) => {

  // req.user.permission
  if (!req.isAuthenticated()) {
    return res.status(401).send('You are not authenticated');
  }
  return next();
};

export default authenticated;
