import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query
} from '@nestjs/common'
import { EmailService } from './email.service'
import { CreateEmailDto } from './dto/create-email.dto'
import { UpdateEmailDto } from './dto/update-email.dto'
import { MailerService } from '@nestjs-modules/mailer'

@Controller('email')
export class EmailController {
	constructor(private mailService: MailerService) {}

	@Get('plain-text-email')
	async plainTextEmail(@Query('toemail') toemail: string) {
		await this.mailService.sendMail({
			to: toemail,
			from: 'artemkim953@gmail.com',
			subject: 'Simple Plain Text',
			text: 'Welcome to nestjs email demo'
		})
		console.log(toemail)
		return 'success'
	}
}
