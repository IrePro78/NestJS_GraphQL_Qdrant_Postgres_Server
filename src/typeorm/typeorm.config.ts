import { ConfigService } from '@nestjs/config';
import {
	type TypeOrmModuleOptions,
	type TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Injectable } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class DatabaseConfiguration implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions():
		| TypeOrmModuleOptions
		| Promise<TypeOrmModuleOptions> {
		return {
			type: this.configService.get('DB_TYPE'),
			host: this.configService.get('DB_HOST'),
			port: parseInt(this.configService.get('DB_PORT')),
			username: this.configService.get('DB_USERNAME'),
			password: this.configService.get('DB_PASSWORD'),
			database: this.configService.get('DB_NAME'),
			entities: [this.configService.get('TYPEORM_ENTITIES')],
			autoLoadEntities: true,
			bigNumberStrings: false,
			logging: ['log', 'error', 'warn', 'info'], // true to all logging
			// logging: true, // true to all logging
			synchronize: true,
			namingStrategy: new SnakeNamingStrategy(),
		} as TypeOrmModuleOptions;
	}
}
