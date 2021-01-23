/* eslint-disable import/no-cycle */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import User from './user';
import Order_Item from './order_item';
  
  @Entity()
  export default class Order_ {
    @PrimaryGeneratedColumn()
    id
  
    @Column({ type: 'int' })
    total_cost
  
    @Column({ type: 'int' })
    total_weight
  
    @Column({ type: 'int' })
    order_status
  
    @Column({ type: 'int' })
    staff_id

    @Column({ type: 'varchar'})
    address

    @Column({ type: 'varchar'})
    tracking_num
  
    @ManyToOne(() => User, (user) => user.orders, {eager: true})
    user

    @OneToMany(() => Order_Item, (order_item) => order_item.order, {cascade : true, eager: true})
    order_items 
 
  }
  
