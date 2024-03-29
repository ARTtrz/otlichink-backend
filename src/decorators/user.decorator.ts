import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '../user/entities/user.entity'

export const CurrentUser = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		console.log(request.user)
		const user = request.user

		return data ? user[data] : user
	}
)
