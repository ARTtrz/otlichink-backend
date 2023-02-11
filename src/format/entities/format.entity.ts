import { Card } from 'src/card/entities/card.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Format {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@ManyToMany(() => Card, (card) => card.formats)
	cards: Card[]
}
