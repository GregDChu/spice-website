import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import OrderItem from '../entities/order_item';

const router = Router();
router.route('/order_item')
  .all(isAuthenticated)
  // .get((req, res) => {
  //   res.send(req.user.order_item); //@@ why todos?
  // })
  .post((req, res) => {
    if (req.user.permission  != 3){
      res.sendStatus(401);
      return;
    }
    const { cost, weight, order, item } = req.body;
    const manager = getManager();
    const order_item = manager.create(OrderItem, { cost, weight, order, item });
    // order_item.user = req.user;
    manager.save(order_item).then((savedOrderItem) => {
      res.send(savedOrderItem);
    });
  });

  
router.route('/order_item/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    debugger
    getRepository(OrderItem).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundOrderItem) => {
      req.order_item = _foundOrderItem;
      next();
    }, () => {
      res.send(404);
    });
  })
  .put((req, res) => {
    
    const foundOrderItem = req.order_item;
    const { cost, weight, order, item  } = req.body;

    foundOrderItem.cost = cost; 
    foundOrderItem.weight = weight; 
    foundOrderItem.order = order; 
    foundOrderItem.item = item; 

   
    getManager().save(foundOrderItem).then((updateOrderItem) => {
      res.send(updatedOrderItem);
    });
  })
  .get((req, res) => {
    res.send(req.order_item);
  })
  .delete((req, res) => {
    getManager().delete(OrderItem, req.order_item.id).then(() => {
      res.send(200);
    });
  });

export default router;
