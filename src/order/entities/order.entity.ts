import { Answer } from 'src/answer/entities/answer.entity'
import { User } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Order extends Base {
	@Column()
	title: string

	@Column()
	description: string

	@ManyToOne(() => User, (user) => user.orders, {
		onDelete: 'CASCADE'
	})
	user: User

	@Column({ default: 0 })
	views: number
}
