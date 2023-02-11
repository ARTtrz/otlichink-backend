import { forwardRef, Module } from '@nestjs/common'
import { CardService } from './card.service'
import { CardController } from './card.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Card } from './entities/card.entity'
import { CategoryModule } from 'src/category/category.module'
import { FormatModule } from 'src/format/format.module'
import { User } from 'src/user/entities/user.entity'
import { UserModule } from 'src/user/user.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([Card, User]),
		forwardRef(() => UserModule),
		CategoryModule,
		FormatModule
	],
	controllers: [CardController],
	providers: [CardService],
	exports: [CardService]
})
export class CardModule {}
