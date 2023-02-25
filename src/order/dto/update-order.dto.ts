import { PartialType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Base } from 'src/utils/base'
import { CreateOrderDto } from './create-order.dto'

export class UpdateOrderDto {
	@IsString()
	description: string

	@IsString()
	title: string
}
