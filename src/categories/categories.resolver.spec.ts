import { Test, type TestingModule } from '@nestjs/testing';
import { CategoryResolver } from '../graphql/resolvers/category.resolver';

describe('CategoriesResolver', () => {
	let resolver: CategoryResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CategoryResolver],
		}).compile();

		resolver = module.get<CategoryResolver>(CategoryResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
