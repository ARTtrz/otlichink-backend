import { Card } from 'src/card/entities/card.entity'
import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class UserFav extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User, (user: User) => user.userFav)
	@JoinColumn({ name: 'user_id' })
	user: User

	// @ManyToOne(() => Card, (card: Card) => card.userFav)
	// @JoinColumn({ name: 'card_id' })
	// favorite: Card
}
