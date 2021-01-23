/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Order from './order';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar' })
  firstname

  @Column({ type: 'varchar' })
  lastname

  @Column({ type: 'int' })
  permission

  @Column({ type: 'varchar', unique: true } )
  email

  @Column({ type: 'varchar', nullable: false })
  password

  @OneToMany(() => Order, (order) => order.user/*, { eager: true}*/)
  orders
}
