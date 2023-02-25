import { Order } from 'aws-sdk/clients/mediaconvert'
import { IsNumber, IsString } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateAnswerDto {
	user?: User

	@IsNumber()
	price: number

	@IsString()
	description: string

	order: number
}
