import { Test, type TestingModule } from '@nestjs/testing';
import { CollectionResolver } from '../graphql/resolvers/collection.resolver';

describe('CollectionResolver', () => {
	let resolver: CollectionResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CollectionResolver],
		}).compile();

		resolver = module.get<CollectionResolver>(CollectionResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
