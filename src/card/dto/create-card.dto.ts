import { IsNumber, IsString } from 'class-validator'
import { City } from 'src/city/entities/city.entity'
import { User } from 'src/user/entities/user.entity'
import { Category } from 'src/category/entities/category.entity'
import { Format } from 'src/format/entities/format.entity'
import { Rating } from 'src/rating/entities/rating.entity'
import { ImageEntity } from 'src/image/entities/image.entity'
import { Experience } from 'src/experience/entities/experience.entity'

export class CreateCardDto {
	@IsString()
	name: string

	@IsNumber()
	age: number

	@IsString()
	description: string

	rating?: Rating

	categories: Category[]

	formats?: Format[]

	experience: Experience

	owner?: User
	rate?: number

	images: string[]

	city: City

	@IsNumber()
	middle_price?: number

	// Image
	@IsString()
	avatar: string
}
