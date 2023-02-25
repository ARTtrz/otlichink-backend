import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { UserService } from '../user/user.service'
import { Repository } from 'typeorm'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { UserRegisterRequestDto } from './dto/user-register.dto'
import { AuthDto } from './dto/auth.dto'
import { UserRoles } from 'src/user/enums/user.enum'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		@InjectRepository(User) private userRepository: Repository<User>
	) {}

	async register(userRegister: UserRegisterRequestDto) {
		const oldUser = await this.userRepository.findOne({
			where: {
				email: userRegister.email
			}
		})
		if (oldUser) {
			throw new BadRequestException(
				'User with this email is already in the systems'
			)
		}

		const newUser = new User()
		newUser.name = userRegister.name
		newUser.email = userRegister.email
		newUser.password = userRegister.password
		newUser.role = UserRoles.CREATOR
		const user = await newUser.save()

		const tokens = await this.issueTokenPair(String(user.id))

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async login(dto: AuthDto) {
		const user = await this.validateUserCreds(dto.email, dto.password)
		const tokens = await this.issueTokenPair(String(user.id))
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d'
		})
		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '20d'
		})

		return { refreshToken, accessToken }
	}

	async validateUserCreds(email: string, password: string): Promise<User> {
		const user = await this.userService.getUserByEmail(email)

		if (!user) throw new BadRequestException()

		if (!(await compare(password, user.password)))
			throw new UnauthorizedException()

		return user
	}

	returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin
		}
	}

	create(createAuthDto: CreateAuthDto) {
		return 'This action adds a new auth'
	}

	findAll() {
		return `This action returns all auth`
	}

	findOne(id: number) {
		return `This action returns a #${id} auth`
	}

	update(id: number, updateAuthDto: UpdateAuthDto) {
		return `This action updates a #${id} auth`
	}

	remove(id: number) {
		return `This action removes a #${id} auth`
	}
}
