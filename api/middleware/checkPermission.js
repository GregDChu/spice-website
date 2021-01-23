function checkPermssion (req, res, next){

    if (req.user.permission == 0) {
        return True
    }else {
        return False
    }
}



// const authenticated = (req, res, next) => {

//     // req.user.permission
//     if (!req.isAuthenticated()) {
//       return res.status(401).send('You are not authenticated');
//     }
//     return next();
//   };
  
export default checkPermssion;
  