import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
	Put,
	HttpCode,
	Query
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/decorators/user.decorator'
import { User } from 'src/user/entities/user.entity'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'
import { Request } from 'express'
import { CategoryService } from 'src/category/category.service'
import { FormatService } from 'src/format/format.service'

@Controller('card')
export class CardController {
	constructor(
		private readonly cardService: CardService,
		private categoryService: CategoryService,
		private formatService: FormatService
	) {}

	@Get('most-popular')
	async mostPopular() {
		return await this.cardService.getMostPopularCards()
	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(
		@Body() createCardDto: CreateCardDto,
		@CurrentUser() user: User
	) {
		createCardDto.owner = user
		const cat = createCardDto.categories
		const new_arr = []
		for (let i = 0; i < cat.length; i++) {
			const category = await this.categoryService.getOne(
				Number(cat[i])
			)
			console.log(cat[i])
			new_arr.push(category)
		}
		console.log(new_arr)
		const format = createCardDto.formats
		const new_formats = []
		for (let i = 0; i < format.length; i++) {
			const new_format = await this.formatService.getOne(
				Number(format[i])
			)
			console.log(format[i])
			new_formats.push(new_format)
		}
		createCardDto.categories = new_arr
		createCardDto.formats = new_formats
		const card = await this.cardService.create(createCardDto)

		return card
	}

	@Get()
	findAll() {
		return this.cardService.getAllCards()
	}

	@Get('get-search')
	@UseGuards(JwtAuthGuard)
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.cardService.getAll(searchTerm)
	}

	@Delete(':id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async deleteUser(@Param('id') id: string) {
		return this.cardService.delete(id)
	}

	@Get('filter')
	async find(@Req() req: Request) {
		// const builder = await this.cardService.queryBuilder('cards')
		// if (req.query.city) {
		// 	console.log('city')
		// 	builder

		// 		.where('cards.city.id= :id', {
		// 			id: req.query.city
		// 		})
		// 		.execute()
		// }

		// if (req.query.category || req.query.city) {
		// 	builder
		// 		.leftJoinAndSelect('cards.city', 'city')
		// 		.leftJoinAndSelect('cards.categories', 'category')

		// 		.where('category.id = :id', { id: req.query.category })
		// }

		let city
		let category
		let isOnline
		let isOffline
		let experience
		let format
		if (req.query.city) {
			city = req.query.city
		}
		if (req.query.format) {
			format = req.query.format
		}
		if (req.query.category) {
			category = req.query.category
		}
		if (req.query.experience) {
			experience = req.query.experience
		}
		if (req.query.isOnline) {
			isOnline = Boolean(req.query.isOnline)
			console.log(typeof isOnline)
		}
		if (req.query.isOffline) {
			isOffline = Boolean(req.query.isOffline)
			console.log(typeof isOffline)
		}

		console.log(city, category, isOffline, isOnline)

		return await this.cardService.filterData(
			city,
			category,
			experience,
			format
		)
	}
	@Get(':id')
	getById(@Param('id') id: string) {
		return this.cardService.getOne(id)
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCardDto: UpdateCardDto
	) {
		const cat = updateCardDto.categories
		const new_arr = []
		for (let i = 0; i < cat.length; i++) {
			const category = await this.categoryService.getOne(
				Number(cat[i])
			)
			console.log(cat[i])
			new_arr.push(category)
		}
		console.log(new_arr)
		updateCardDto.categories = new_arr
		return this.cardService.update(id, updateCardDto)
	}

	@HttpCode(200)
	@Put('update-views/:cardId')
	async updateViews(@Param('cardId') cardId: string) {
		return this.cardService.updateCountViews(cardId)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/favorite')
	async favorite(@CurrentUser() user: User, @Body('cardId') cardId: string) {
		return await this.cardService.favorite(cardId, user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/unfavorite')
	async unfavorite(
		@CurrentUser() user: User,
		@Body('cardId') cardId: string
	) {
		return await this.cardService.unfavorite(cardId, user.id)
	}

	@Get('/user/:id')
	async findByUserId(@Param('id') id: number) {
		return this.cardService.getCardsByUser(id)
	}
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.cardService.deletePost(id)
	}
}
