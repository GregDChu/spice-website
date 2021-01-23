import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import User from '../entities/user';

const router = Router();
router.route('/getitems')
//   .all(isAuthenticated)
  .get((req, res) => {
    console.log("yes");
    res.send();
  })

export default router;
