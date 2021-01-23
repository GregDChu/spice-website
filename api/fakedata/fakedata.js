import { createConnection, getManager, getRepository} from 'typeorm';
import User from "../entities/user.js";
import Tag from "../entities/tag.js";
import Item from "../entities/item.js";
import Order_Item from "../entities/order_item.js";
import Order from "../entities/order.js";
import Announcement from "../entities/announcement.js";
import StaffAlert from "../entities/staff_alert.js";

var faker = require('faker');
faker.seed(123);
var items = [];
var write = true;
var counter = -3;

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

function repeatString(n, string) {
  var repeat = [];
  repeat.length = n + 1;
  return repeat.join(string);
}

function genCharArray(charA, charZ) {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(repeatString(2, String.fromCharCode(i))); 
  }
  return a
}

function randInt(leftVal, rightVal) {
  return Math.floor(Math.random() * (rightVal - leftVal) + leftVal)
}

function retOrderId() {
  counter += 3;
  return counter;
}

createConnection().then(() => {
  var i = 0;
  var alpha = genCharArray('a', 'z');
  // generate items
  var spices = ["spicy", "salty", "peppery", "red", "umami", "sweet", "brown", "italian", "fresh", "coarse", "spice", "herb", "blend"]
  var saved_tags = [];
  var spice_names = ["salt", "paprika", "tumeric", "pink salt", "oregano", "bay leaves", "ginger", "coriander", "star anise", "pepper"];
  var spice_pics = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F7%2F7e%2FKorean_sea_salt.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.thespicehouse.com%2Fimages%2Ffile%2F1454%2Flarge_square_Hungarian_Half-Sharp_Paprika__close.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aNvb-bOSkgcr01uqbDIxPQHaHa%26pid%3DApi&f=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.southernstylespices.com%2Fwp-content%2Fuploads%2F2019%2F03%2FSalts-Himalayan_Pink_Salt_Fine_20190125_004-export-e1555203550405.png&f=1&nofb=1", 
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0219%2F5528%2Fproducts%2Foregano-mexican_1024x1024.png%3Fv%3D1368717989&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.herbalteasonline.com%2Fwp-content%2Fuploads%2F2016%2F08%2FBay-Leaves.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-prod.medicalnewstoday.com%2Fcontent%2Fimages%2Fhero%2F265%2F265990%2F265990_1100.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.thespicehouse.com%2Fimages%2Ffile%2F1152%2Flarge_square_Coriander_Seeds__Moroccan__Ground__close.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.healthbenefitstimes.com%2F9%2Fgallery%2Fstar-anise%2FStar-Anise-Rusot%25C3%25A4htianis.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.organicfacts.net%2Fwp-content%2Fuploads%2F2013%2F06%2FBlackpepper.jpg&f=1&nofb=1"
  ];
  for(i = 0; i < spices.length; i++) {
    let tag = new Tag();
    tag.title = spices[i];
    const entityManager = getManager();
    if(write) {
      saved_tags.push(entityManager.save(tag));
    }
  }

  for(i = 0; i < 10; i++) {
    let item = new Item();
    item.title = spice_names[i];
    item.unit_price = randInt(10, 20);
    item.stock = randInt(100, 500);
    item.description = "description of " + spice_names[i];
    item.image = spice_pics[i];
    let val = randInt(0, 9);
    items.push(item);
    if(write) {
      getManager().save(item);
    }
  }
	// person_type: 
	// * owner - 0
	// * admin - 1
	// * staff - 2
	// * customer - 3
	// email @{person_type}.com

  for(i = 0; i < 10; i++) {
    var name = faker.name.findName().split(' ');
    let user = new User();
    user.firstname = name[0];
    user.lastname = name[1];
    user.password = "some";
    if(i < 5) {
      user.permission = 3; 
    	user.email = `${user.firstname[0]}${user.lastname}@customer.com`
    } else if(i >= 5 && i < 8) {
      user.permission = 2; 
    	user.email = `${user.firstname[0]}${user.lastname}@staff.com`
    } else {
      user.permission = 1; 
    	user.email = `${user.firstname[0]}${user.lastname}@admin.com`
    }
    if(write) {
      getManager().save(user);
    }
  }
  let user = new User()
  user.firstname = "Owner";
  user.lastname = "Owner";
  user.email = "Owner";
  user.password = "Owner";
  user.permission = 0;
  if(write) {
    getManager().save(user);
  }

  var a = new Announcement(); 
  a.link_to = "/Shop/salt";
  a.img_link= "https://i.imgur.com/sZ92nzl.png";
  getManager().save(a);
  a = new Announcement(); 
  a.link_to = "/Shop/paprika";
  a.img_link = "https://i.imgur.com/m4eMfBc.png";
  getManager().save(a);

  // generate staff alerts
  for(i = 0; i < 10; i++) {
    let sa = new StaffAlert(); 
    sa.author = "author_"+alpha[i];
    sa.text = "here is some text written by author_" + alpha[i];
    if(write) {
      getManager().save(sa);
    }
  }

  var j = 0;
  var order_items_lst = [];
  var orders = [];
  for(i = 0; i < 3; i++) {
    var temp_lst = [];
    var o = new Order();
    o.order_status = 0;
    o.staff_id = randInt(5,8);
    o.address = "fake address";
    o.user = randInt(1, 10);
    o.total_cost = 0;
    o.total_weight = 0;
    var temp_set = new Set();
    for(j = 0; j < 3; j++) {
      var oi = new Order_Item();
      oi.order = i+1;
      oi.weight = randInt(10, 20);
      o.total_weight += oi.weight;
      oi.item = randInt(0, 10);
      while(temp_set.has(oi.item)) {
        oi.item = randInt(0, 10); 
      }
      temp_set.add(oi.item)
      oi.item += 1
      oi.cost = oi.weight * items[oi.item-1].unit_price;
      o.total_cost += oi.cost;
      order_items_lst.push([i+1, oi]);
    }
    console.log(order_items_lst)
    getManager().save(o).then((savedOrder) => {
      var i = retOrderId() 
      var oi1 = order_items_lst[i][1]
      var oi2 = order_items_lst[i+1][1]
      var oi3 = order_items_lst[i+2][1]
      oi1.order = savedOrder
      oi2.order = savedOrder
      oi3.order = savedOrder
      getManager().save(oi1)
      getManager().save(oi2)
      getManager().save(oi3)
    })
  }
})
