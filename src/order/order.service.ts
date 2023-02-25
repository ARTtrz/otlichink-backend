import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order) private orderRepository: Repository<Order>
	) {}
	async create(dto: CreateOrderDto) {
		const order = await this.orderRepository.create(dto)
		return this.orderRepository.save(order)
	}
	async findAll() {
		const orders = await this.orderRepository.find({
			order: {
				createdAt: 'DESC'
			},
			relations: {
				user: true
			}
		})
		return orders
	}

	async getById(id: number) {
		const order = await this.orderRepository.findOne({
			where: {
				id: id
			}
		})
		return order
	}

	async getAll(searchTerm?: string) {
		const result = await this.orderRepository
			.createQueryBuilder('orders')
			.select()
			.where('description like :searchTerm', {
				searchTerm: `%${searchTerm}%`
			})
			.orderBy('orders.createdAt', 'DESC')
			.getMany()

		return result
	}

	async updateCountViews(id: number) {
		const updateCard = await this.orderRepository.findOne({
			where: { id: id },
			select: ['id', 'views']
		})
		updateCard.views += 1
		return this.orderRepository.save(updateCard)
	}
	async delete(id: number) {
		const deleteCard = await this.orderRepository.findOne({
			where: {
				id: id
			}
		})

		return this.orderRepository.remove(deleteCard)
	}

	async findByUserId(userId: number) {
		const orders = await this.orderRepository.find({
			order: {
				createdAt: 'DESC'
			},
			where: {
				user: {
					id: userId
				}
			}
		})
		return orders
	}

	async update(id: number, updateOrderDto: UpdateOrderDto) {
		const entityname = await this.orderRepository.findOne({
			where: {
				id: id
			}
		})

		Object.assign(entityname, updateOrderDto)
		await this.orderRepository.save(entityname)
	}

	remove(id: number) {
		return `This action removes a #${id} order`
	}
}
