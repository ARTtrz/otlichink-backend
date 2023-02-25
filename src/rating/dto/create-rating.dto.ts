import { IsNumber } from 'class-validator'

export class CreateRatingDto {
	@IsNumber()
	cardId: string

	@IsNumber()
	value: number
}
