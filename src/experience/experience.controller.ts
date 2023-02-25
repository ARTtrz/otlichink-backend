import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards
} from '@nestjs/common'
import { ExperienceService } from './experience.service'
import { CreateExperienceDto } from './dto/create-experience.dto'
import { UpdateExperienceDto } from './dto/update-experience.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('experience')
export class ExperienceController {
	constructor(private readonly experienceService: ExperienceService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	create(@Body() createCategoryDto: CreateExperienceDto) {
		return this.experienceService.create(createCategoryDto)
	}

	@Get()
	findAll() {
		return this.experienceService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.experienceService.getOne(id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateExperienceDto: UpdateExperienceDto
	) {
		return this.experienceService.update(+id, updateExperienceDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.experienceService.remove(+id)
	}
}
