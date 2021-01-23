import { createConnection, getManager, getRepository} from 'typeorm';
import User from "../entities/user.js";
import Tag from "../entities/tag.js";
import Item from "../entities/item.js";
import Order_Item from "../entities/order_item.js";
import Order from "../entities/order.js";
import Announcement from "../entities/announcement.js";
import StaffAlert from "../entities/staff_alert.js";
var num_items = 35;
var num_tags = 10;
var num_users = 10;
var num_orders = 10;

const arrSum = arr => arr.reduce((a,b) => a + b, 0)

// verify data in order_item / item
createConnection().then(() => {
  var i = 1;
  let order_items = getRepository(Order_Item).find(
    {where: {order: i}} 
  ).then((_foundOI) => {
    var order_cost = getRepository(Order).findOneOrFail(i).then((foundOrder) => {
      var oi_cost = _foundOI.map((oi) => {
        return oi.cost 
      })
      var oi_weight = _foundOI.map((oi) => {
        return oi.weight 
      })
      if((foundOrder.total_cost == arrSum(oi_cost)) && (foundOrder.total_weight == arrSum(oi_weight))) {
        console.log("--------SUCCESS---------") 
      } else {
        console.log("==============FAILURE=============") 
        console.log("o cost")
        console.log(foundOrder.total_cost)
        console.log("o weight")
        console.log(foundOrder.total_weight)
        console.log("oi cost")
        console.log(arrSum(oi_cost))
        console.log("oi cost")
        console.log(arrSum(oi_weight))
      }
    })
  }, () => {
    console.log("could not find order items associated with order ", i+1) 
  });
});
// verify data in orders / order_item
