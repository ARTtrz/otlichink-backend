import { Module } from '@nestjs/common'
import { RatingService } from './rating.service'
import { RatingController } from './rating.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Rating } from './entities/rating.entity'
import { UserModule } from 'src/user/user.module'
import { CardModule } from 'src/card/card.module'
import { User } from 'src/user/entities/user.entity'
import { Card } from 'src/card/entities/card.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([Rating, User, Card]),
		CardModule,
		UserModule
	],
	controllers: [RatingController],
	providers: [RatingService]
})
export class RatingModule {}
