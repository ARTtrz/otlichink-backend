import { IsString } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateOrderDto {
	@IsString()
	description: string

	user?: User
}
