import { forwardRef, Module } from '@nestjs/common'
import { ImageModule } from 'src/image/image.module'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
	imports: [ImageModule],
	controllers: [FileController],
	providers: [FileService],
	exports: [FileService]
})
export class FileModule {}
