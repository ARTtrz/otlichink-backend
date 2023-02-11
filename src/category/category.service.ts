import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		const category = await this.categoryRepository.create(
			createCategoryDto
		)
		return await this.categoryRepository.save(category)
	}

	async getOne(id: number) {
		return await this.categoryRepository.findOne({
			where: {
				id: id
			}
		})
	}

	async findAll() {
		return await this.categoryRepository.find({
			order: {
				name: 'ASC'
			}
		})
	}

	findOne(id: number) {
		return `This action returns a #${id} category`
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`
	}

	remove(id: number) {
		return this.categoryRepository
			.createQueryBuilder('category')
			.delete()
			.from(Category)
			.where('id= :id', { id: id })
			.execute()
	}
}
