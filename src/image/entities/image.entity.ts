import { Card } from 'src/card/entities/card.entity'
import {
	Column,
	Entity,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class ImageEntity {
	@PrimaryColumn()
	id: string

	@Column()
	url: string

	@ManyToOne(() => Card, (card) => card.images)
	card: Card
}
