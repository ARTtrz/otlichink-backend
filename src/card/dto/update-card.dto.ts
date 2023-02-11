import { PartialType } from '@nestjs/swagger'
import { CreateCardDto } from './create-card.dto'
import { IsNumber, IsString } from 'class-validator'
import { Category } from 'src/category/entities/category.entity'
import { City } from 'src/city/entities/city.entity'

export class UpdateCardDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsNumber()
	rating?: number

	categories: Category[]
	isOnline: boolean

	isOffline: boolean

	city: City

	@IsString()
	address: string

	@IsNumber()
	middle_price?: number

	// Image
	@IsString()
	thumbnail: string
}
