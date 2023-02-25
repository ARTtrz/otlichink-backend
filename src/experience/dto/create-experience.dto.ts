import { IsString } from 'class-validator'

export class CreateExperienceDto {
	@IsString()
	name: string
}
