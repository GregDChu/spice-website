import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';


  @Entity()
  export default class StaffAlert {

    @PrimaryGeneratedColumn()
    id

    @Column({ type: 'varchar' })
    author

    @Column({ type: 'varchar' })
    text

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    time
  }
