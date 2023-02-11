import { IsString } from 'class-validator'

export class CreateFormatDto {
	@IsString()
	name: string
}
