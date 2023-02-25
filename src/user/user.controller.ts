import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	UseInterceptors,
	Req,
	UploadedFile,
	Query,
	HttpCode
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { CurrentUser } from 'src/decorators/user.decorator'
import { User } from './entities/user.entity'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@Get()
	findAll() {
		return this.userService.getAllUsers()
	}

	@UseGuards(JwtAuthGuard)
	@Get('get')
	findOne(@CurrentUser() user: User) {
		return user
	}

	@Get('get-search')
	@UseGuards(JwtAuthGuard)
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	@Delete(':id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async deleteUser(@Param('id') id: number) {
		return this.userService.delete(id)
	}

	@UseGuards(JwtAuthGuard)
	@Get('count')
	getUserCount() {
		return this.userService.getUsersCount()
	}

	@Post('set-admin/:id')
	async setAdmin(@Param('id') id: number) {
		return await this.userService.setAdmin(id)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	async getUserById(@Param('id') id: number) {
		return await this.userService.getById(id)
	}
	// @UseGuards(JwtAuthGuard)
	// @Get('/getFav')
	// async getFavByUser(@CurrentUser() user: User) {
	// 	return await this.userService.getCardsByUser(user.id)
	// }

	// @Post('addFavorite')
	// @UseGuards(JwtAuthGuard)
	// async addFav(@Body('cardId') cardId: number, @CurrentUser() user: User) {
	// 	return await this.userService.addFavorites(cardId, user)
	// }

	// @Post('removeFav')
	// @UseGuards(JwtAuthGuard)
	// async removeFav(
	// 	@Body('cardId') cardId: number,
	// 	@CurrentUser() user: User
	// ) {
	// 	return await this.userService.untoggle(cardId, user.id)
	// }
	// async addFavorites(
	// 	@Body('cardId') cardId: number,
	// 	@CurrentUser() user: User
	// ) {
	// 	return this.userService.addFavorites(cardId, user)
	// }

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.userService.remove(id)
	}
}
