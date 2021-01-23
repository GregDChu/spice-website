import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
// import checkPermission from '../middleware/checkPermission';
import Announcement from '../entities/announcement';
import Item from '../entities/item';
import Tag from '../entities/tag';



const router = Router();
router.route('/item_tag_1')
  .all(isAuthenticated)



  .post((req, res) => {
    if (req.user.permission  > 1){
        res.sendStatus(401);
        return;
    }
    const { itemID, tags  } = req.body;
    // const manager = getManager();
    debugger;

    //  getting item ID
    let selected_item = itemID;

    //  getting tag ID 
    let tags_list = tags;


    //  query for a list of tag entities 
    let tag_entities = tags_list.map((tagID) => { 
        // debugger;
        return getRepository(Tag).findOneOrFail(tagID).then((tag) => {
            return tag
        }, () => {
            res.send("couldn't find Tag entity")
        })
    });


    //  update item entity with a list of tags. 
    return Promise.all(tag_entities).then((tagEntities) => {
        return getRepository(Item).findOneOrFail(parseInt(selected_item)).then((item) => {
                item.tags = tagEntities;
                return getManager().save(item).then((savedItem) => {
                res.send(savedItem);
        
                }, () => {
                    res.send("couldn't save item");
                })
        }, () =>
        {
            res.send("couldn't find the item");
        })

        
    })

});




export default router;




