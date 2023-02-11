import { genSalt, hash } from 'bcrypt'
import { Card } from 'src/card/entities/card.entity'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { UserRoles } from '../enums/user.enum'
import { Comment } from 'src/comment/entities/comment.entity'
import { UserFav } from './userFav.entity'
import { Rating } from 'src/rating/entities/rating.entity'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: false })
	name: string

	@Column({
		unique: true
	})
	email: string

	@OneToOne(() => Rating, (rating) => rating.user)
	rating: Rating

	@Column()
	password: string

	@Column({ type: 'enum', enum: UserRoles, default: UserRoles.MEMBER })
	role: UserRoles

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@OneToMany(() => Card, (card) => card.owner)
	cards: Card[]

	// @ManyToOne(() => Card, (card) => card.likedUsers)
	// favorite: Card
	// @ManyToMany(() => Card, (card) => card.user, {
	// 	cascade: true
	// })
	// @JoinTable()
	// favorites: Card[]
	@OneToMany(() => UserFav, (userFav) => userFav.user)
	userFav: Array<UserFav>

	@OneToMany(() => Comment, (comment) => comment.user)
	comments?: Comment[]

	@Column({ default: false, nullable: false })
	isAdmin: boolean

	// addFavorite(favorite: Card) {
	// 	console.log(this.favorites)
	// 	if (this.favorites == null || this.favorites == undefined) {
	// 		this.favorites = new Array<Card>()
	// 	}

	// 	this.favorites = [...this.favorites, favorite]

	// 	console.log(this.favorites)
	// }

	@BeforeInsert()
	async setPassword(password: string) {
		const salt = await genSalt(10)
		this.password = await hash(password || this.password, salt)
	}

	@ManyToMany(() => Card, (card) => card.users, { cascade: true })
	@JoinTable({ name: 'card_favorites_user' })
	favorites: Card[]
}
