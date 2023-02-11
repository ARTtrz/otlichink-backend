import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ValidationPipe,
	UsePipes,
	HttpCode
} from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiTags
} from '@nestjs/swagger'
import { SETTINGS } from 'src/app.utils'
import { User } from 'src/user/entities/user.entity'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { UserRegisterRequestDto } from './dto/user-register.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@ApiTags('User')
	@ApiCreatedResponse({
		description: 'Created user object as repsonse',
		type: User
	})
	@ApiBadRequestResponse({ description: 'User cannot register. Try again' })
	@Post('/register')
	async register(
		@Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegisterRequestDto
	) {
		return await this.authService.register(userRegister)
	}

	@Get()
	findAll() {
		return this.authService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.authService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
		return this.authService.update(+id, updateAuthDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.authService.remove(+id)
	}
}
