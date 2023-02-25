import { User } from 'src/user/entities/user.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'Artyom_2006',
	database: 'hakaton',

	entities: [__dirname + '/../**/*.entity.{ts,js}'], //нужно былоо тс первым делать\

	// migrations: [__dirname + '../../**/*/migrations/*{.ts,.js}'],
	migrations: ['dist/db/migrations/*.{ts,js}'],

	extra: {
		charset: 'utf8mb4_unicode_ci'
	},
	synchronize: true
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
