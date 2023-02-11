import { MigrationInterface, QueryRunner } from "typeorm";

export class ViewsProblemNullable1673071865293 implements MigrationInterface {
    name = 'ViewsProblemNullable1673071865293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`views\` \`views\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`views\` \`views\` int NOT NULL`);
    }

}
