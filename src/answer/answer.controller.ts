import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/decorators/user.decorator'
import { User } from 'src/user/entities/user.entity'
import { AnswerService } from './answer.service'
import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'

@Controller('answer')
export class AnswerController {
	constructor(private readonly answerService: AnswerService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(
		@Body() createAnswerDto: CreateAnswerDto,
		@CurrentUser() user: User
	) {
		createAnswerDto.user = user
		return this.answerService.create(createAnswerDto)
	}

	@Get()
	findAll() {
		return this.answerService.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: number) {
		return this.answerService.findById(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
		return this.answerService.update(+id, updateAnswerDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.answerService.remove(+id)
	}
}
