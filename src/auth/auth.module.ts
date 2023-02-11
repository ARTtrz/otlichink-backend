import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from 'src/config/jwt.config'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/user/user.module'
import { JWTStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
	imports: [
		UserModule,
		PassportModule,
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JWTStrategy, LocalStrategy]
})
export class AuthModule {}
