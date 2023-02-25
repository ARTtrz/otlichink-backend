import { Order } from 'src/order/entities/order.entity'
import { User } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Answer extends Base {
	@Column()
	description: string

	@ManyToOne(() => User, (user) => user.answers, {
		onDelete: 'CASCADE'
	})
	user: User

	@Column()
	price: number
	@Column()
	order: number
}
