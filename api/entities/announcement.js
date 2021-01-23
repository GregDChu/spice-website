import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';


  @Entity()
  export default class Announcement {

    @PrimaryGeneratedColumn()
    id
  
    @Column({ type: 'varchar' })
    img_link

    @Column({ type: 'varchar' })
    link_to

  }
