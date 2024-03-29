import { MigrationInterface, QueryRunner } from "typeorm";

export class adduserId1672907886812 implements MigrationInterface {
    name = 'adduserId1672907886812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_77d7cc9d95dccd574d71ba221b0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_77d7cc9d95dccd574d71ba221b0\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`userId\``);
    }

}
