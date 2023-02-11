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
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(
		@Body() createCommentDto: CreateCommentDto,
		@CurrentUser() user: User
	) {
		createCommentDto.user = user

		return await this.commentService.create(createCommentDto)
	}

	@Get()
	findAll() {
		return this.commentService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.commentService.byPostId(id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCommentDto: UpdateCommentDto
	) {
		return this.commentService.update(+id, updateCommentDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.commentService.remove(+id)
	}
}
