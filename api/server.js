import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { createConnection } from 'typeorm';
import passport from 'passport';
import config from './config/passport';

import login from './routes/login';

import item from './routes/item';
import order_items from './routes/order_item';
import order from './routes/order';
import order_all from './routes/order_all';
import tag from './routes/tag';
import signup from './routes/signup'
import announcement from './routes/announcement';
import submit_order from './routes/submit_order';
import assign_tags_item  from './routes/assign_tags_item';
import staff_alert from './routes/staff_alert';
// import item_tag from './routes/item_tag';



// Setting up port
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // For body parser
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());
config();

// wire up all the routes
app.use(login(passport));
app.use(item);
app.use(order_items);
app.use(order);
app.use(order_all);
app.use(tag);
app.use(staff_alert);
app.use(signup);
app.use(assign_tags_item);
app.use(announcement); 
app.use(submit_order);
// app.use(item_tag);


// app.use(todo);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_req, res) => {
  res.send('hello world');
});

createConnection().then(() => {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log('Example app listening on port 3000!'));
});
