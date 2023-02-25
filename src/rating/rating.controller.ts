import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { CreateRatingDto } from './dto/create-rating.dto'
import { UpdateRatingDto } from './dto/update-rating.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common/decorators'
import { CurrentUser } from 'src/decorators/user.decorator'
import { User } from 'src/user/entities/user.entity'

@Controller('rating')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@Post('set-rating')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async setRating(@CurrentUser() user: User, @Body() dto: CreateRatingDto) {
		return this.ratingService.setRating(user.id, dto)
	}

	@Post()
	create(@Body() createRatingDto: CreateRatingDto) {
		return this.ratingService.create(createRatingDto)
	}

	@UseGuards(JwtAuthGuard)
	@Get('by-user/:cardId')
	async getCardValueByUser(
		@Param('cardId') cardId: string,
		@CurrentUser() user: User
	) {
		return await this.ratingService.getCardValueByUser(cardId, user.id)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.ratingService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
		return this.ratingService.update(+id, updateRatingDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ratingService.remove(+id)
	}
}
