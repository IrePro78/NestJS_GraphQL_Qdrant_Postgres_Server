import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.model';

@Entity('categories')
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique identifier of the category' })
  id: string;
  @Column()
  @Field({ description: 'Name of the category' })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];
}