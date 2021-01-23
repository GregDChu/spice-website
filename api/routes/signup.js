import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import User from '../entities/user';

const router = Router();
// creating user
router.route('/signup')
.post((req, res) => {
  debugger;
  const { firstname, lastname, email, password } = req.body;
  console.log(firstname);
  const manager = getManager();
  const user = manager.create(User, { firstname, lastname, permission : 3, email, password });

  manager.save(user).then((savedUser) => {
    debugger;
    res.send(savedUser);
  }, () => {
    debugger;
    res.send(400);
  });
});


router.route('/signup/:id')
.all((req, res, next) => {
  getRepository(User).findOneOrFail(
    { where: {id: req.params.id} },
  ).then((_foundUser) => {
    req.user = _foundUser;
    next();
  }, () => {
    res.send(404);
  });

})

// alter user info
.put((req, res) => {
  const foundUser = req.user;
  const {  firstname, lastname, email, password } = req.body;

  foundUser.firstname = firstname;
  foundUser.lastname = lastname;
  foundUser.email = email;
  foundUser.password = password;

  getManager().save(foundUser).then((updatedUser) => {
    res.send(updatedUser);
  });
})
//   .get((req, res) => {
//     res.send(req.tag);
//   })
// delete user
.delete((req, res) => {
  getManager().delete(User, req.user.id).then(() => {
    res.send(200);
  });
});

export default router;
