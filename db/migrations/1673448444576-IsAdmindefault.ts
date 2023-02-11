import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAdmindefault1673448444576 implements MigrationInterface {
    name = 'IsAdmindefault1673448444576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isAdmin\` \`isAdmin\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isAdmin\` \`isAdmin\` tinyint NULL`);
    }

}
