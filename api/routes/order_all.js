import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Order_ from '../entities/order';
import Order_Item from '../entities/order_item';

const router = Router();
router.route('/order_all')
  .all(isAuthenticated)
  .get((req, res) => {
    const orderManager = getManager(); // you can also get it via getConnection().getRepository() or getManager().getRepository()
    /*const itemManager = getManager();
    async findAll() {
      const orderRepo = getRepository(Order_);
      const orders = await orderRepo.find({ relations : ["order_items"]});
    }
    res.send(orders);*/
    orderManager.find(Order_).then((_foundAllOrders) => {
      res.send(_foundAllOrders);
      }, () => {
      res.send(404);
    })
  });

  export default router;