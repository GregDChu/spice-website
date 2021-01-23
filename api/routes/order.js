import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Order_ from '../entities/order';

const router = Router();
router.route('/order')
  .all(isAuthenticated)

  // .all((req, res, next) => {
  //   debugger

  // })


  .all((req, res, next) => {
      debugger
      getRepository(Order_).find(
        { where: { userId: req.user.id} },
      ).then((_foundOrder) => {
        req.order = _foundOrder;
        next();
      }, () => {
        res.send(404); 
      } )
  })
  .get((req, res) => {
    // debugger
    getRepository(Order_).find(
      { where: { user: req.user.id }}
    ).then((_foundOrder) => {
      // debugger
      res.send(_foundOrder);

      // req.order = _foundOrder;
      // next();
    }, () => {
      debugger
      res.send(404);
    });
  })
  
  .post((req, res) => {
    const { total_cost, total_weight, order_status, staff } = req.body;
    const manager = getManager();
    const order = manager.create(Order_, { total_cost, total_weight, order_status, staff_id: 9, address : "someone house" });
    order.user = req.user;
    manager.save(order).then((savedOrder) => {
      res.send(savedOrder);
    });
  });



router.route('/order/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    debugger
    getRepository(Order_).findOneOrFail(
      { where: { id: req.params.id } },
    ).then((_foundOrder) => {
      debugger
      req.order = _foundOrder;
      next();
    }, () => {
      res.send(404);
    });
  })
  .put((req, res) => {
    const foundOrder = req.order;
    const {  total_cost, total_weight, order_status, staff_id, user, order_item, tracking_num} = req.body;
    foundOrder.total_cost = total_cost;
    foundOrder.total_weight = total_weight;
    foundOrder.order_status = order_status;
    foundOrder.staff_id = staff_id;
    foundOrder.user = user; 
    foundOrder.order_item = order_item;
    foundOrder.tracking_num = tracking_num;

    getManager().save(foundOrder).then((updatedOrder) => {
      res.send(updatedOrder);
    });
  })
  .get((req, res) => {
    debugger
    res.send(req.order);
  })
  .delete((req, res) => {
    getManager().delete(Order, req.order.id).then(() => {
      res.send(200);
    });
  });

export default router;
