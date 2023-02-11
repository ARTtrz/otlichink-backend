import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAdminuser1673447433402 implements MigrationInterface {
    name = 'IsAdminuser1673447433402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isAdmin\` \`isAdmin\` tinyint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isAdmin\` \`isAdmin\` tinyint NOT NULL`);
    }

}
