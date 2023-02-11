import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'

export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectRepository(User) private userRepository: Repository<User>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate(payload) {
		const user = this.userRepository.findOne({
			where: {
				id: payload._id
			}
		})
		console.log(payload)
		return user
	}
}
