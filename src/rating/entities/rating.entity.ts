import { Card } from 'src/card/entities/card.entity'
import { User } from 'src/user/entities/user.entity'
import {
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Rating {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Card, (card) => card.rating, {
		onDelete: 'CASCADE'
	})
	card: Card

	@ManyToOne(() => User, (user) => user.rating, {
		onDelete: 'CASCADE'
	})
	user: User

	@Column({ default: 0 })
	value: number
}
