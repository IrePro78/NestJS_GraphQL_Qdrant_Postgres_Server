import { forwardRef, Module } from '@nestjs/common';
import { CollectionsModule } from 'src/collections/collections.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductResolver } from '../graphql/resolvers';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsService } from './products.service';

@Module({
	imports: [
		forwardRef(() => CategoriesModule),
		forwardRef(() => CollectionsModule),
		forwardRef(() => OrdersModule),
	],
	providers: [ProductsService, ProductResolver],
	exports: [ProductsService],
})
export class ProductsModule {}
