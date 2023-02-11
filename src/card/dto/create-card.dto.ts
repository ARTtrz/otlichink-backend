import { IsNumber, IsString } from 'class-validator'
import { City } from 'src/city/entities/city.entity'
import { User } from 'src/user/entities/user.entity'
import { Category } from 'src/category/entities/category.entity'
import { Format } from 'src/format/entities/format.entity'
import { Rating } from 'src/rating/entities/rating.entity'
import { ImageEntity } from 'src/image/entities/image.entity'

export class CreateCardDto {
	@IsString()
	title: string

	@IsString()
	description: string

	rating?: Rating

	categories: Category[]

	formats?: Format[]

	owner?: User

	images: string[]

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
