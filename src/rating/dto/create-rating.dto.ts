import { IsNumber } from 'class-validator'

export class CreateRatingDto {
	@IsNumber()
	cardId: number

	@IsNumber()
	value: number
}
