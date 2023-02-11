import { Card } from 'src/card/entities/card.entity'
import { User } from 'src/user/entities/user.entity'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	text: string

	@ManyToOne(() => User, (user) => user.comments)
	user?: User

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	// post
	@Column()
	post: number
}
