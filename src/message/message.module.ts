import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageGateway } from './message.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageEntity } from './entities/message.entity'
import { ConversationEntity } from 'src/conversation/entities/conversation.entity'
import { ConversationService } from 'src/conversation/conversation.service'
import { MessageController } from './message.controller'

@Module({
	imports: [TypeOrmModule.forFeature([MessageEntity, ConversationEntity])],
	controllers: [MessageController],
	providers: [MessageService, MessageGateway, ConversationService]
})
export class MessageModule {}
