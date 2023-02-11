import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFormatDto } from './dto/create-format.dto'
import { UpdateFormatDto } from './dto/update-format.dto'
import { Format } from './entities/format.entity'

@Injectable()
export class FormatService {
	constructor(
		@InjectRepository(Format) private formatRepository: Repository<Format>
	) {}
	async create(createFormatDto: CreateFormatDto) {
		const format = await this.formatRepository.create(createFormatDto)
		return await this.formatRepository.save(format)
	}

	async getOne(id: number) {
		const format = await this.formatRepository.findOne({
			where: {
				id: id
			}
		})
		return format
	}

	async findAll() {
		return await this.formatRepository.find()
	}

	findOne(id: number) {
		return `This action returns a #${id} format`
	}

	update(id: number, updateFormatDto: UpdateFormatDto) {
		return `This action updates a #${id} format`
	}

	remove(id: string) {
		return this.formatRepository
			.createQueryBuilder('format')
			.delete()
			.from(Format)
			.where('id= :id', { id: id })
			.execute()
	}
}
