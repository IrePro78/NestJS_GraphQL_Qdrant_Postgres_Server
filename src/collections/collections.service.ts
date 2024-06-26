import { Injectable } from '@nestjs/common';
import { Collection } from 'src/graphql/models';

@Injectable()
export class CollectionsService {
	async findAll(take: number = 20, skip: number = 0) {
		return Collection.find({
			take,
			skip,
		});
	}

	async findOneById(id: string) {
		return Collection.findOne({
			where: { id },
			relations: { products: true },
		});
	}

	async findOneBySlug(slug: string) {
		return Collection.findOne({
			where: { slug },
			relations: { products: true },
		});
	}

	async findByProductId(id: string) {
		return Collection.find({
			relations: { products: true },
			where: { products: { id } },
		});
	}
}
