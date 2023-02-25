import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'
import { Answer } from './entities/answer.entity'

@Injectable()
export class AnswerService {
	constructor(
		@InjectRepository(Answer) private answerRepository: Repository<Answer>
	) {}

	async create(createAnswerDto: CreateAnswerDto) {
		const answer = await this.answerRepository.create(createAnswerDto)
		return await this.answerRepository.save(answer)
	}

	findAll() {
		return `This action returns all answer`
	}

	async findById(orderId: number) {
		return await this.answerRepository.find({
			where: {
				order: orderId
			},
			relations: {
				user: {
					cards: true
				}
			}
		})
	}

	update(id: number, updateAnswerDto: UpdateAnswerDto) {
		return `This action updates a #${id} answer`
	}

	remove(id: number) {
		return `This action removes a #${id} answer`
	}
}
