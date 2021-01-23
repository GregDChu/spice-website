import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
// import checkPermission from '../middleware/checkPermission';
import Announcement from '../entities/announcement';



const router = Router();
router.route('/announcement')

  
  .get((req, res) => { // @@why do we need req here?? error will be thrown otherwise. 

    const itemManager = getManager(); // you can also get it via getConnection().getRepository() or getManager().getRepository()
    itemManager.find(Announcement).then((_foundAnnouncment) => {
      res.send(_foundAnnouncment);
      })

  })


  .post((req, res) => {

    // owner or admin only! 
    if (req.user.permission  > 1){
      res.sendStatus(401);
      return;
    }
    const { img_link, link_to } = req.body;
    const manager = getManager();
    const announce = manager.create(Announcement, { img_link, link_to });

    manager.save(announce).then((savedannounce) => {
      res.send(savedannounce);
    });
  });

router.route('/announcement/:id')
  // .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(Announcement).findOneOrFail(
      { where: { id: req.params.id } },
    ).then((_foundAnnouncement) => {
      req.announcement = _foundAnnouncement;
      next();
    }, () => {
      res.send(404);
    });
  })

  .put((req, res) => {
    if (req.user.permission > 1){
      res.sendStatus(401);
      return;
    }
    const foundAnnounce = req.announcement;
    const {img_link, link_to } = req.body;


    foundAnnounce.img_link = img_link;
    foundAnnounce.link_to = link_to;
    getManager().save(foundAnnounce).then((updatedAnnounce) => {
      res.send(updatedAnnounce);
    });
  })

  // .get((req, res) => {
  //   debugger;
  //   res.send(req.announcement);
  // })

  .delete((req, res) => {
    if (req.user.permission > 1){
      res.sendStatus(401);
      return;
    }

    getManager().delete(Announcement, req.announcement.id).then(() => {
      res.sendStatus(200);
    });
 
  });

  export default router;
