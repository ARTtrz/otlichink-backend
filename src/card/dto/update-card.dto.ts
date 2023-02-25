import { PartialType } from '@nestjs/swagger'
import { CreateCardDto } from './create-card.dto'
import { IsNumber, IsString } from 'class-validator'
import { Category } from 'src/category/entities/category.entity'
import { City } from 'src/city/entities/city.entity'
import { Format } from 'src/format/entities/format.entity'
import { Rating } from 'src/rating/entities/rating.entity'

export class UpdateCardDto {
	@IsString()
	name: string

	@IsNumber()
	age: number

	@IsString()
	description: string

	rating?: Rating

	categories: Category[]

	formats?: Format[]

	rate?: number

	images: string[]

	city: City

	// Image
	@IsString()
	avatar: string
}
