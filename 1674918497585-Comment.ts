import { MigrationInterface, QueryRunner } from "typeorm";

export class Comment1674918497585 implements MigrationInterface {
    name = 'Comment1674918497585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`postId\` \`post\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`post\` \`postId\` int NOT NULL`);
    }

}
