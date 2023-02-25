import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateExperienceDto } from './dto/create-experience.dto'
import { UpdateExperienceDto } from './dto/update-experience.dto'
import { Experience } from './entities/experience.entity'

@Injectable()
export class ExperienceService {
	constructor(
		@InjectRepository(Experience)
		private experienceRepository: Repository<Experience>
	) {}

	async create(createCategoryDto: CreateExperienceDto) {
		const category = await this.experienceRepository.create(
			createCategoryDto
		)
		return await this.experienceRepository.save(category)
	}

	async getOne(id: number) {
		return await this.experienceRepository.findOne({
			where: {
				id: id
			}
		})
	}

	async findAll() {
		return await this.experienceRepository.find({
			order: {
				name: 'DESC'
			}
		})
	}

	findOne(id: number) {
		return `This action returns a #${id} experience`
	}

	update(id: number, updateExperienceDto: UpdateExperienceDto) {
		return `This action updates a #${id} experience`
	}

	remove(id: number) {
		return `This action removes a #${id} experience`
	}
}
