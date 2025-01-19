import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Orders } from "./orders.entity";
import { Role } from "role.enum";
@Entity({name: 'Users'})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
  
    @Column({ length: 50, nullable: false })
    name: string;
  
    @Column({ length: 50, unique: true, nullable: false })
    email: string;
  
    @Column({ length: 100, nullable: false })
    password: string;
  
    @Column({ type: 'bigint' })
    phone: number;
  
    @Column({ length: 50 })
    country: string;
  
    @Column({ type: 'text' })
    address: string;
  
    @Column({ length: 50 })
    city: string;
    
    @Column({type: 'varchar'})
    apodo: string;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;
  
    @OneToMany(() => Orders, (order) => order.user_id)
    @JoinColumn()
    orders_id: Orders[];
  }