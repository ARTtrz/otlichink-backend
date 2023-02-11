import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { CardModule } from 'src/card/card.module'
import { UserFav } from './entities/userFav.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([User, UserFav]),
		forwardRef(() => CardModule)
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
