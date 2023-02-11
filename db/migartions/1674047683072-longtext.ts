import { MigrationInterface, QueryRunner } from "typeorm";

export class longtext1674047683072 implements MigrationInterface {
    name = 'longtext1674047683072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`description\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
