import { IsNumber, IsString } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateCommentDto {
	@IsString()
	text: string

	user?: User

	post: string
}
