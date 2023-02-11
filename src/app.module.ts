import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { dataSourceOptions } from './db/data-source'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { CardModule } from './card/card.module'
import { CommentModule } from './comment/comment.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { EmailModule } from './email/email.module'

import Joi from 'joi'
import { FileModule } from './file/file.module'
import { CityModule } from './city/city.module'
import { CategoryModule } from './category/category.module'
import { FormatModule } from './format/format.module'
import { RatingModule } from './rating/rating.module'

import { ImageModule } from './image/image.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		MailerModule.forRoot({
			transport: {
				host: 'smtp.sendgrid.net',
				port: 465,
				auth: {
					user: 'apikey',
					pass: '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'
				}
			}
		}),
		TypeOrmModule.forRoot(dataSourceOptions),
		UserModule,
		AuthModule,
		CardModule,
		CommentModule,
		EmailModule,
		FileModule,
		CityModule,
		CategoryModule,
		FormatModule,
		RatingModule,

		ImageModule
	],

	providers: [AppService]
})
export class AppModule {}
