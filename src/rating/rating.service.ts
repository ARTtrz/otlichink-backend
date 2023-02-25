import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardService } from 'src/card/card.service'
import { Card } from 'src/card/entities/card.entity'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateRatingDto } from './dto/create-rating.dto'
import { UpdateRatingDto } from './dto/update-rating.dto'
import { Rating } from './entities/rating.entity'

@Injectable()
export class RatingService {
	constructor(
		@InjectRepository(Rating)
		private RatingRepository: Repository<Rating>,
		@InjectRepository(Card) private cardRepository: Repository<Card>,
		@InjectRepository(User) private userRepository: Repository<User>,
		private readonly cardService: CardService
	) {}

	async averageRatingByCard(cardId: string) {
		const ratingsCard: Rating[] = await this.RatingRepository.find({
			where: {
				card: {
					id: cardId
				}
			}
		})
		return Math.round(
			ratingsCard.reduce((acc, item) => acc + item.value, 0) /
				ratingsCard.length
		)
	}

	async setRating(userId: number, dto: CreateRatingDto) {
		const { cardId, value } = dto
		console.log(userId, cardId, value)
		const user = await this.userRepository.findOne({
			where: {
				id: userId
			}
		})

		const card = await this.cardRepository.findOne({
			where: {
				id: cardId
			}
		})

		const existRating = await this.RatingRepository.findOne({
			where: {
				card: {
					id: cardId
				},
				user: {
					id: userId
				}
			}
		})

		if (existRating) {
			existRating.value = value
			existRating.user = user
			existRating.card = card
			await this.RatingRepository.save(existRating)
		} else {
			const newRating = new Rating()

			newRating.value = value
			newRating.user = user
			newRating.card = card
			await this.RatingRepository.save(newRating)
		}

		const averageRating = await this.averageRatingByCard(cardId)

		await this.cardService.updateRating(cardId, averageRating)

		return card
	}

	async getCardValueByUser(cardId: string, userId: number) {
		console.log(cardId, userId)
		return await this.RatingRepository.findOne({
			where: {
				user: {
					id: userId
				},
				card: {
					id: cardId
				}
			}
		}).then((data) => (data ? data.value : 0))
	}

	create(createRatingDto: CreateRatingDto) {
		return 'This action adds a new rating'
	}

	findAll() {
		return `This action returns all rating`
	}

	findOne(id: number) {
		return `This action returns a #${id} rating`
	}

	update(id: number, updateRatingDto: UpdateRatingDto) {
		return `This action updates a #${id} rating`
	}

	remove(id: number) {
		return `This action removes a #${id} rating`
	}
}
