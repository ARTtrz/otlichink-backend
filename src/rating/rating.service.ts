import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRatingDto } from './dto/create-rating.dto'
import { UpdateRatingDto } from './dto/update-rating.dto'
import { Rating } from './entities/rating.entity'

@Injectable()
export class RatingService {
	constructor(
		@InjectRepository(Rating) private RatingRepository: Repository<Rating>
	) {}

	async averageRatingByCard(cardId: number) {
		const ratingsCard: Rating[] = await this.RatingRepository.find({
			where: {
				card: {
					id: cardId
				}
			}
		})
		return (
			ratingsCard.reduce((acc, item) => acc + item.value, 0) /
			ratingsCard.length
		)
	}

	async setRating(userId: number, dto: CreateRatingDto) {
		const { cardId, value } = dto

		const newRating = await this.RatingRepository.findOne({
			where: {
				card: {
					id: cardId
				},
				user: {
					id: userId
				}
			}
		})
	}

	async getCardValueByUser(card: number, user: number) {
		return this.RatingRepository.findOne({
			where: {
				user: {
					id: user
				},
				card: {
					id: card
				}
			},
			select: ['value']
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
