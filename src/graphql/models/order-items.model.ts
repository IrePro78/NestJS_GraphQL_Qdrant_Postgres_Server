import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.model';
import { Order } from './order.model';

@Entity('order_items')
@ObjectType()
export class OrderItems extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID, {
		description: 'Unique identifier of the order item',
	})
	id: string;
	@Column({ type: 'int', default: 0 })
	@Field(() => Int, { description: 'Quantity of the product' })
	quantity: number;

	@Column({ type: 'float', default: 0 })
	@Field(() => Float, {
		description: 'Total amount of the order item',
	})
	total: number;

	@ManyToOne(() => Product, (product) => product)
	product: Product;

	@ManyToOne(() => Order, (order) => order)
	order: Order;
}
