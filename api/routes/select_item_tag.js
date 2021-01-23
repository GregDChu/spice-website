import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Item from '../entities/item';
import Tag from '../entities/tag';
import 'babel-polyfill';

async function getTag(tagId) {
  let foundTag = getRepository(Tag).findOneOrFail(
    {where: {id: tagId}} 
  ).then((_foundTag) => {
    console.log(_foundTag);
    return _foundTag;
  }, () => {
    return null; 
  });
  let result = await foundTag;
  console.log("await has been passed")
  console.log(result);
  return result;
}

const router = Router();
router.route('/item_tag')
//   .all(isAuthenticated)
  .get((req, res) => {
    debugger
    getTag(3);
    res.send("hello world"); //@@ why todos?
  })
  
  .post((req, res) => {
    // assign the tag to the given item
    debugger
    const { itemId, tagId } = req.body;
    getRepository(Item).findOneOrFail(
      {where: {id : itemId}}
    ).then((_foundItem) => {
      _foundItem.tag = getTag(tagId);
      getManager().save(_foundItem);
      getRepository(Tag).findOneOrFail(
        {where: {id: tagId}} 
      ).then((_foundTag) => {
        _foundItem.tag = _foundTag; 
        console.log(_foundItem);
        getManager().save(_foundItem);
      }, () => {
        res.sendStatus(404); 
      });
    }, () => {
      res.sendStatus(404);
    });
    res.sendStatus(200);
  });

/*
getRepository(order_item).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundOrderItem) => {
      req.order_item = _foundOrderItem;
      next();
    }, () => {
      res.send(404);
    });
*/


export default router;


  
