import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
  } from 'typeorm';

import Item from './item';

@Entity()
export default class Tag {

  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar' })
  title

  @ManyToMany( () => Item, (item) => item.tags)
  items

  }
