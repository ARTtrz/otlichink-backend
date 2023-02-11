import { Injectable } from '@nestjs/common'
import { BadRequestException, HttpException } from '@nestjs/common/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import dataSource from 'src/db/data-source'
import { User } from 'src/user/entities/user.entity'

import {
	Between,
	LessThan,
	LessThanOrEqual,
	MoreThan,
	MoreThanOrEqual,
	Raw,
	Repository
} from 'typeorm'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'
import { Card } from './entities/card.entity'

@Injectable()
export class CardService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Card) private cardRepository: Repository<Card>
	) {}

	async getAllCards() {
		await this.cardRepository.find({
			relations: {}
		})
		return this.cardRepository
			.createQueryBuilder('c')
			.leftJoinAndSelect('c.city', 'cc')
			.leftJoinAndSelect('c.categories', 'ccat')

			.getMany()
	}

	async queryBuilder(alias: string) {
		return this.cardRepository.createQueryBuilder(alias)
	}

	async getOne(id: number) {
		return await this.cardRepository.findOne({
			relations: {
				categories: true
			},
			where: {
				id: id
			}
		})
	}

	async filterData(
		city: string,
		category: string,
		from: number,
		to: number,
		format: string
	) {
		return await this.cardRepository.find({
			relations: {
				city: true,
				categories: true,
				formats: true
			},

			where: {
				city: {
					name: city
				},

				categories: {
					name: category
				},

				formats: {
					name: format
				},

				middle_price: Between(from, to)
			}
		})
	}
	async create(cardDto: CreateCardDto) {
		try {
			const alreadyExist = await this.cardRepository.findOne({
				where: {
					description: cardDto.description
				}
			})
			if (alreadyExist) {
				throw new BadRequestException('Card is already taken')
			}
			// const newCard = await this.cardRepository.create({
			//   title: cardDto.title,
			//   descritpion: cardDto.description,
			//   rating: cardDto.rating

			// })
		} catch (error) {}
		console.log('Categories', cardDto.categories[0])

		const card = this.cardRepository.create(cardDto)
		return this.cardRepository.save(card)
		// return card
	}

	async favorite(cardId: number, userId: number) {
		let card = await this.cardRepository.findOne({
			where: {
				id: cardId
			}
		})
		const user = await this.userRepository.findOne({
			relations: {
				favorites: true
			},
			where: {
				id: userId
			}
		})

		const isNewFavorite = user.favorites
			? user.favorites.findIndex((_card) => _card.id === card.id) < 0
			: true

		if (isNewFavorite) {
			user.favorites.push(card)
			await this.userRepository.save(user)
			card.favoriteCount = card.favoriteCount + 1
			await this.cardRepository.save(card)
		}
		return user
	}

	async unfavorite(cardId: number, userId: number) {
		let card = await this.cardRepository.findOne({
			where: {
				id: cardId
			}
		})
		const user = await this.userRepository.findOne({
			relations: {
				favorites: true
			},
			where: {
				id: userId
			}
		})

		const deleteIndex = user.favorites.findIndex(
			(_card) => _card.id === card.id
		)

		if (deleteIndex >= 0) {
			user.favorites.splice(deleteIndex, 1)
			card.favoriteCount = card.favoriteCount - 1
			await this.userRepository.save(user)
			await this.cardRepository.save(card)
		}

		return { card }
	}

	async getCardsByUser(userId: number) {
		return this.cardRepository.find({
			where: {
				owner: {
					id: userId
				}
			}
		})
	}

	findAll() {
		return `This action returns all card`
	}

	findOne(id: number) {
		return `This action returns a #${id} card`
	}

	async updateCountViews(id: number) {
		const updateCard = await this.cardRepository.findOne({
			where: { id: id },
			select: ['id', 'views']
		})
		updateCard.views += 1
		return this.cardRepository.save(updateCard)
	}
	async update(id: number, updateCardDto: UpdateCardDto) {
		// return await dataSource
		// 	.createQueryBuilder()
		// 	.update(Card)
		// 	.set(updateCardDto)
		// 	.where('id = :id', { id: id })
		// 	.execute()

		// return await this.cardRepository.update(id, updateCardDto)
		// const updatePost = await this.cardRepository.findOne({
		// 	where: {
		// 		id: id
		// 	}
		// })
		// const { categories } = updateCardDto
		// updatePost.title = updateCardDto.title
		// updatePost.categories = categories
		// console.log(updatePost.categories)

		// return await this.cardRepository.save(updatePost)

		const entityname = await this.cardRepository.findOne({
			where: {
				id: id
			}
		})
		console.log(updateCardDto.categories[0])
		Object.assign(entityname, updateCardDto)
		await this.cardRepository.save(entityname)
	}

	async deletePost(id: string) {
		return await this.cardRepository.delete(id)
	}
}
