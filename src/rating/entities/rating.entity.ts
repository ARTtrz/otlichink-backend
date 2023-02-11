import { Card } from 'src/card/entities/card.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Rating {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => Card, (card) => card.rating)
	card: Card

	@OneToOne(() => User, (user) => user.rating)
	user: User

	@Column()
	value: number
}
