import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCityDto } from './dto/create-city.dto'
import { UpdateCityDto } from './dto/update-city.dto'
import { City } from './entities/city.entity'

@Injectable()
export class CityService {
	constructor(
		@InjectRepository(City) private cityRepository: Repository<City>
	) {}
	async create(createCityDto: CreateCityDto) {
		const city = await this.cityRepository.create(createCityDto)
		return this.cityRepository.save(city)
	}

	async findAll() {
		return await this.cityRepository.find({
			order: {
				name: 'ASC'
			}
		})
	}

	findOne(id: number) {
		return `This action returns a #${id} city`
	}

	update(id: number, updateCityDto: UpdateCityDto) {
		return `This action updates a #${id} city`
	}

	remove(id: number) {
		return `This action removes a #${id} city`
	}
}
