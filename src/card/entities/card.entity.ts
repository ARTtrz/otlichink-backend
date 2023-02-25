import { User } from 'src/user/entities/user.entity'
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from 'src/comment/entities/comment.entity'
import { UserFav } from 'src/user/entities/userFav.entity'
import { City } from 'src/city/entities/city.entity'
import { Category } from 'src/category/entities/category.entity'
import { FormatTypes } from '../enums/card.enum'
import { Format } from 'src/format/entities/format.entity'
import { Rating } from 'src/rating/entities/rating.entity'

import { Pic } from './pic.dto'
import { ImageEntity } from 'src/image/entities/image.entity'
import { Experience } from 'src/experience/entities/experience.entity'

@Entity({ name: 'card' })
export class Card extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ default: 0 })
	rate: number

	@Column()
	name: string

	@Column()
	age: number

	@Column({ type: 'mediumtext' })
	description: string

	@Column()
	phone_number: string

	@Column({ default: false })
	isPublic: boolean

	@Column({ nullable: true })
	avatar: string

	@OneToMany(() => Rating, (rating) => rating.card, {
		onDelete: 'CASCADE'
	})
	rating: Rating // пока что так, потом нужно создать отдельный компнонент

	@ManyToOne(() => User, (user) => user.cards, {
		onDelete: 'CASCADE'
	})
	owner: User

	// @Column({
	// 	type: 'set',
	// 	enum: FormatTypes,
	// 	default: [FormatTypes.OFFLINE]
	// })
	// formats: FormatTypes[]

	// // @OneToMany(() => User, (user) => user.favorite)
	// likedUsers: User[]
	// @ManyToMany(() => User, (user) => user.favorites)
	// user: User
	// @OneToMany(() => UserFav, (userFav) => userFav.favorite)
	// userFav: Array<UserFav>

	@ManyToMany(() => Category, (category) => category.cards, {
		cascade: true
	})
	@JoinTable({ name: 'card_categories' })
	categories: Array<Category>

	@ManyToOne(() => Experience, (category) => category.cards, {
		cascade: true
	})
	experience: Category

	@ManyToMany(() => Format, (format) => format.cards, {
		cascade: true
	})
	@JoinTable({ name: 'card_formats' })
	formats: Array<Format>

	// коммнетарии

	@ManyToOne(() => City, (city) => city.cards)
	city: City

	@Column({ nullable: true, default: 0 })
	views?: number

	// @Column({ nullable: true })
	// address: string

	@Column({ default: 0 })
	favoriteCount: number

	@ManyToMany(() => User, (user) => user.favorites)
	users: Array<User>

	@Column('simple-array')
	images: string[]
}
