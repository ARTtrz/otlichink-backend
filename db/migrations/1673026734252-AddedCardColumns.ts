import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCardColumns1673026734252 implements MigrationInterface {
    name = 'AddedCardColumns1673026734252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`city\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`views\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`middle_price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`cityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_3308ff7db50c515af64a4985c85\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_3308ff7db50c515af64a4985c85\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`cityId\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`middle_price\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`views\``);
        await queryRunner.query(`DROP TABLE \`city\``);
    }

}
