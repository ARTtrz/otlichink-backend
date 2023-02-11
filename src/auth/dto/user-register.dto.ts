import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'
import { MESSAGES, REGEX } from 'src/app.utils'

export class UserRegisterRequestDto {
	@ApiProperty({
		description: 'The name of the User',
		example: 'Jhon Doe'
	})
	@IsNotEmpty()
	name: string

	@ApiProperty({
		description: 'The email address of the User',
		example: 'jhon.doe@gmail.com'
	})
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty({
		description: 'The password of the User',
		example: 'Password@123'
	})
	@IsNotEmpty()
	@Length(6, 24)
	password: string
}
