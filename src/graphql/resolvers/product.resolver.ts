import {
	Args,
	ID,
	Int,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { Collection } from 'src/graphql/models/collection.model';
import { CollectionsService } from 'src/collections/collections.service';
import { Review } from 'src/graphql/models/review.model';
import { Product } from '../models/product.model';
import { ProductsService } from '../../products/products.service';
import { Category } from '../models/category.model';
import { CategoriesService } from '../../categories/categories.service';
import { CreateProductInput } from '../dto/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
	constructor(
		private readonly productService: ProductsService,
		private readonly categoryService: CategoriesService,
		private readonly collectionService: CollectionsService,
	) {}

	@Query(() => [Product], {
		name: 'products',
		description: 'Get All Products',
		nullable: true,
	})
	async getProducts(
		@Args('take', { type: () => Int, defaultValue: 30 }) take: number,
		@Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
		@Args('sort', { type: () => String, defaultValue: 'default' })
		sort: string,
	): Promise<Product[]> {
		return this.productService.findAll(take, skip, sort);
	}

	@Query(() => [Product], {
		name: 'productsByName',
		description: 'Get Products By Name',
		nullable: true,
	})
	async getProductsByName(
		@Args('name', { type: () => String }) name: string,
		@Args('take', { type: () => Int, defaultValue: 30 }) take: number,
		@Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
	): Promise<Product[]> {
		return this.productService.findAllByName(name, take, skip);
	}

	@ResolveField(() => [Category], {
		name: 'categories',
		description: 'Get Categories By Product',
		nullable: true,
	})
	async getCategories(@Parent() product: Product) {
		return this.categoryService.findByProductId(product.id);
	}

	@ResolveField(() => [Collection], {
		name: 'collections',
		description: 'Get Collections By Product',
		nullable: true,
	})
	async getCollections(@Parent() product: Product) {
		return this.collectionService.findByProductId(product.id);
	}

	@ResolveField(() => [Review], {
		name: 'reviews',
		description: 'Get Reviews By Product',
		nullable: true,
	})
	async getReviews(@Parent() product: Product) {
		return this.productService.findReviewsByProductId(product.id);
	}

	@Query(() => Product, {
		name: 'product',
		description: 'Get Product By ID',
		nullable: true,
	})
	async getProductById(
		@Args('id', { type: () => ID }) id: string,
	): Promise<Product> {
		return this.productService.findOneById(id);
	}

	@Mutation(() => Product, {
		name: 'createProduct',
		description: 'Create Product',
		nullable: true,
	})
	async createProduct(
		@Args('createProductData')
		createProductData: CreateProductInput,
	): Promise<Product> {
		return this.productService.create(createProductData);
	}
}
