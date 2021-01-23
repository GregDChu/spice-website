import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Tag from '../entities/tag';

const router = Router();
router.route('/tag')
  //.all(isAuthenticated)
  .get((req, res) => {
    //res.send(req.user.tag); //@@ why todos?
    // res.send("hello");
    const tagManager = getManager();
    tagManager.find(Tag).then((foundTags) => {
      res.send(foundTags);
    }, () => {
      res.sendStatus(404);
    })
  })
  .post((req, res) => {
    if (req.user.permission > 1){
      res.sendStatus(401);
    }
    const { title } = req.body;
    const manager = getManager();
    const tag = manager.create(Tag, { title});
    // tag.user = req.user;
    manager.save(tag).then((savedTag) => {
      res.send(savedTag);
    });
  });


router.route('/tag/:id')
  .all((req, res, next) => {
    getRepository(Tag).findOneOrFail(
      { where: { id: req.params.id } },
    ).then((_foundTag) => {
      req.tag = _foundTag;
      next();
    }, () => {
      res.send(404);
    });
  })
  .put(isAuthenticated)
  .put((req, res) => {
    if (req.user.permission > 1){
      res.sendStatus(401);
      return;
    }
    const foundTag = req.tag;
    const { title, item } = req.body;

    foundTag.title = title;
    foundTag.item = item;


    getManager().save(foundTag).then((updatedTag) => {
      res.send(updatedTag);
    });
  })
  .get((req, res) => {
    res.send(req.tag);
  })

  .delete(isAuthenticated)
  .delete((req, res) => {
    if (req.user.permission > 1){
      res.sendStatus(401);
      return;
    }
    getManager().delete(Tag, req.tag.id).then(() => {
      res.send(200);
    });
  });

export default router;
