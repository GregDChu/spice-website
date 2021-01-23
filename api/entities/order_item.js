/* eslint-disable import/no-cycle */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import Order from './order';
  import Item from './item';

  
  @Entity()
  export default class Order_Item {
    @PrimaryGeneratedColumn()
    id
  
    @Column({ type: 'int' })
    cost
  
    @Column({ type: 'int' })
    weight
  
  
    @ManyToOne( () => Order, (order) => order.Order_Item)
    order

    @ManyToOne( () => Item, (item) => item.Order_Item, {eager: true})
    item

  }
  