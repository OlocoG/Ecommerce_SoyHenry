import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Products } from "./products.entity";
@Entity({name: 'Categories'})
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({length: 50, nullable: false})
    name: string;

    @OneToMany(() => Products, (product) => product.categories_id)
    @JoinColumn()
    product: Products[];
}