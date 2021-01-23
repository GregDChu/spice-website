import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
// import checkPermission from '../middleware/checkPermission';
import StaffAlert from '../entities/staff_alert';



const router = Router();
router.route('/staff_alert')
  .all(isAuthenticated)

  .get((req, res) => {

    const itemManager = getManager(); // you can also get it via getConnection().getRepository() or getManager().getRepository()
    itemManager.find(StaffAlert).then((alerts) => {
      res.send(alerts);
      }, () => {
      res.send(404);
    })

  })
  .post((req, res) => {
    if (req.user.permission > 1){
      res.sendStatus(401);
      return;
    }
    const {text} = req.body;
    debugger;
    const author = req.user.firstname + " " + req.user.lastname;
    const manager = getManager();
    const alert = manager.create(StaffAlert, { author, text });

    manager.save(alert).then((savedAlert) => {
      res.send(savedAlert);
    });
  });

router.route('/staff_alert/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(StaffAlert).findOneOrFail(
      { where: { id: req.params.id } },
    ).then((foundAlert) => {
      req.alert = foundAlert;
      next();
    }, () => {
      res.send(404);
    });
  })

  .get((req, res) => {
    res.send(req.alert);
  })

  .delete((req, res) => {
    getManager().delete(StaffAlert, req.alert.id).then(() => {
      res.sendStatus(200);
    });
  });
export default router;
