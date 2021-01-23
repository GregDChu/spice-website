import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
// import checkPermission from '../middleware/checkPermission';
import Item from '../entities/item';

const router = Router();
router.route('/item')
  // .all(isAuthenticated)
  .get((req, res) => {
    const itemManager = getManager(); // you can also get it via getConnection().getRepository() or getManager().getRepository()
    itemManager.find(Item).then((_foundAllItem) => {
      res.send(_foundAllItem);
      }, () => {
      res.send(404);
    })
  })

  .post((req, res) => {
    if (req.user.permission > 1){
      res.sendStatus(401);
      return;
    }

    const { title, unit_price, stock, description, image, sale} = req.body;

    const manager = getManager();
    const item = manager.create(Item, { title, unit_price, stock, description, image, sale});

    //item.user = req.user;


    manager.save(item).then((savedItem) => {
      res.send(savedItem);
    });
  });


router.route('/item/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(Item).findOneOrFail(
      { where: { id: req.params.id } },
    ).then((_foundItem) => {
      req.item = _foundItem;
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
    const foundItem = req.item;

    const {title, unit_price, stock, description, image, sale, order_item, tags  } = req.body;

    foundItem.title = title;
    foundItem.unit_price = unit_price;
    foundItem.stock = stock;
    foundItem.description = description;
    foundItem.image = image;

    //clamp sale between 0 and 100
    foundItem.sale = sale < 0 ? 0 : sale > 100 ? 100 : sale;
    foundItem.order_item = order_item;
    foundItem.tags = tags;

    getManager().save(foundItem).then((updatedItem) => {
      res.send(updatedItem);
    });
  })
  .get((req, res) => {
    res.send(req.item);
  })
  .delete((req, res) => {
    if (req.user.permission > 1){
      res.sendStatus(401);
      return;
    }
    getManager().delete(Item, req.item.id).then(() => {
      res.sendStatus(200);
    });
  });

export default router;
