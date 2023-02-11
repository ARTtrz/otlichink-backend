import {
	forwardRef,
	HttpException,
	HttpStatus,
	Injectable
} from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators'
import { InjectRepository } from '@nestjs/typeorm'
import { CardService } from 'src/card/card.service'
import { Card } from 'src/card/entities/card.entity'

import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserFav } from './entities/userFav.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(UserFav)
		private UserFavRepository: Repository<UserFav>,
		private cardService: CardService
	) {}
	async getById(id: number) {
		const user = await this.userRepository.findOne({
			relations: {
				favorites: true
			},
			where: {
				id: id
			}
		})
		if (user) {
			return user
		}
		throw new HttpException(
			'User with this id does not exist',
			HttpStatus.NOT_FOUND
		)
	}

	async getAllUsers() {
		return this.userRepository.find()
	}

	async getUserByEmail(email: string): Promise<User | undefined> {
		return User.findOne({ where: { email } })
	}

	async queryBuilder(alias: string) {
		return this.userRepository.createQueryBuilder(alias)
	}

	// async toggleFavorite(cardId: number, user: User) {
	// 	const card = await this.cardService.getOne(cardId)
	// 	const { id, favorites } = user
	// 	const new_user = await this.userRepository
	// 		.update({ id }, { favorites: [card.id] })
	// 		.then((response) => response.raw[0])
	// 	return new_user
	// 	// if (user.favorites !== undefined) {
	// 	// 	if (!user.favorites.includes(card)) {

	// 	// 		user.favorites = [...user.favorites, card]
	// 	// 	}
	// 	// } else {
	// 	// 	const new_user = await this.userRepository.update({id}, {favorites: [...user.favorites, card]})

	// 	// }
	// }
	// async addFavorites(cardId: number, user: User) {
	// 	// console.log(user.favorites)
	// 	// const card = await this.cardService.getOne(cardId)
	// 	// if (user.favorites == null || user.favorites == undefined) {
	// 	// 	user.favorites = []
	// 	// }
	// 	// user.favorites.push(card)
	// 	// return await this.userRepository.save(user)
	// 	const card = await this.cardService.getOne(cardId)
	// 	const userFav = new UserFav()
	// 	userFav.user = user
	// 	userFav.favorite = card

	// 	const newUserFav = userFav.save()
	// 	return newUserFav
	// }

	// async untoggle(cardId: number, userId: number) {
	// 	const cardToRemove = await this.cardService.getOne(cardId)
	// 	const cards = await this.UserFavRepository.find({
	// 		relations: {
	// 			favorite: true
	// 		},
	// 		where: {
	// 			user: {
	// 				id: userId
	// 			}
	// 		}
	// 	})

	// 	const arr = cards.map((card) => card.favorite)
	// 	let new_arr: Card[] = []
	// 	const favusercard = await this.UserFavRepository.findOne({
	// 		where: {
	// 			favorite: {
	// 				id: cardToRemove.id
	// 			},
	// 			user: {
	// 				id: userId
	// 			}
	// 		}
	// 	})
	// 	for (var i = 0; i < arr.length; i++) {
	// 		if (arr[i].id == cardToRemove.id) {
	// 			new_arr = arr.filter(function (item) {
	// 				return item.id !== cardToRemove.id
	// 			})
	// 			favusercard.favorite.remove()
	// 		}
	// 	}

	// 	console.log('arrr', arr)
	// 	const new_el = new UserFav()

	// 	return 'a'
	// }

	// async getCardsByUser(userId: number) {
	// 	const cards = await this.UserFavRepository.find({
	// 		relations: {
	// 			favorite: true
	// 		},
	// 		where: {
	// 			user: {
	// 				id: userId
	// 			}
	// 		}
	// 	})
	// 	return cards.map((card) => card.favorite)
	// }

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user'
	}

	findAll() {
		return `This action returns all user`
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	async remove(id: number) {
		return await this.userRepository
			.createQueryBuilder('users')
			.delete()
			.from(User)
			.where('id= :id', { id: id })
			.execute()
	}
}
