import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/decorators/user.decorator'

import { ConversationService } from './conversation.service'
import { ConversationDto } from './dto/conversation.dto'

@Controller('conversation')
export class ConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async getById(@Param('id') id: number) {
		return this.conversationService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@UseGuards(JwtAuthGuard)
	async createConversation(
		@Body() { withUserId }: ConversationDto,
		@CurrentUser('id') currentUserId: number
	) {
		return this.conversationService.create(currentUserId, withUserId)
	}
}
