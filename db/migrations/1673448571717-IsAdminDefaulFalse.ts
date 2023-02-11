import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAdminDefaulFalse1673448571717 implements MigrationInterface {
    name = 'IsAdminDefaulFalse1673448571717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isAdmin\` \`isAdmin\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isAdmin\` \`isAdmin\` tinyint NULL`);
    }

}
