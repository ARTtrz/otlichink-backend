import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities/comment.entity'
@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private commentRepository: Repository<Comment>
	) {}

	async create(createCommentDto: CreateCommentDto) {
		const comment = await this.commentRepository.create(createCommentDto)
		return this.commentRepository.save(comment)
	}

	async byPostId(postId: string) {
		const comments = await this.commentRepository.find({
			relations: {
				user: true
			},
			where: {
				post: postId
			}
		})

		return comments
	}

	findAll() {
		return `This action returns all comment`
	}

	findOne(id: number) {
		return `This action returns a #${id} comment`
	}

	update(id: number, updateCommentDto: UpdateCommentDto) {
		return `This action updates a #${id} comment`
	}

	remove(id: number) {
		return `This action removes a #${id} comment`
	}
}
