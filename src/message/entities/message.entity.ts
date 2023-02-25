import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ConversationEntity } from '../../conversation/entities/conversation.entity'

import { Base } from '../../utils/base'

@Entity({ name: 'message' })
export class MessageEntity extends Base {
	@Column()
	text: string

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_from' })
	userFrom: User

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_to' })
	userTo: User

	@ManyToOne(() => ConversationEntity)
	@JoinColumn({ name: 'conversation' })
	conversation: ConversationEntity
}
