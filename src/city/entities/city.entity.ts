import { Card } from 'src/card/entities/card.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class City extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@OneToMany(() => Card, (card) => card.city)
	cards: Card[]
}
