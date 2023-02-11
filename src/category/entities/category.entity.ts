import { Card } from 'src/card/entities/card.entity'
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@ManyToMany(() => Card, (card) => card.categories)
	cards: Card[]
}
