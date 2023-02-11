import { forwardRef, Module } from '@nestjs/common'
import { ImageService } from './image.service'
import { ImageController } from './image.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageEntity } from './entities/image.entity'
import { FileModule } from 'src/file/file.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([ImageEntity]),
		forwardRef(() => FileModule)
	],
	controllers: [ImageController],
	providers: [ImageService],
	exports: [ImageService]
})
export class ImageModule {}
