import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateImageDto } from './dto/create-image.dto'
import { UpdateImageDto } from './dto/update-image.dto'
import { ImageEntity } from './entities/image.entity'

@Injectable()
export class ImageService {
	constructor(
		@InjectRepository(ImageEntity)
		private imageEntityRepository: Repository<ImageEntity>
	) {}
	async save(data: CreateImageDto) {
		return await this.imageEntityRepository.save(data)
	}

	findAll() {
		return `This action returns all image`
	}

	findOne(id: number) {
		return `This action returns a #${id} image`
	}

	update(id: number, updateImageDto: UpdateImageDto) {
		return `This action updates a #${id} image`
	}

	remove(id: number) {
		return `This action removes a #${id} image`
	}
}
