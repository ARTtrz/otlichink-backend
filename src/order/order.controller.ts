import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
	HttpCode,
	Put
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/decorators/user.decorator'
import { User } from 'src/user/entities/user.entity'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}
	@UseGuards(JwtAuthGuard)
	@Get('by-user-id')
	async getOrdersByUserUd(@CurrentUser('id') id: number) {
		return await this.orderService.findByUserId(id)
	}
	@Get('get-search')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.orderService.getAll(searchTerm)
	}
	@Get(':id')
	getOne(@Param('id') id: number) {
		return this.orderService.getById(id)
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: User) {
		createOrderDto.user = user
		return this.orderService.create(createOrderDto)
	}

	@Get()
	findAll() {
		return this.orderService.findAll()
	}

	@Delete(':id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async deleteUser(@Param('id') id: number) {
		return this.orderService.delete(id)
	}

	@HttpCode(200)
	@Put('update-views/:orderId')
	async updateViews(@Param('orderId') orderId: number) {
		return this.orderService.updateCountViews(orderId)
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() updateOrderDto: UpdateOrderDto
	) {
		return this.orderService.update(id, updateOrderDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.orderService.remove(+id)
	}
}
