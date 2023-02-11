import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPublicFIle1672747601541 implements MigrationInterface {
    name = 'AddedPublicFIle1672747601541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`public_file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatarId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_58f5c71eaab331645112cf8cfa\` (\`avatarId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_58f5c71eaab331645112cf8cfa\` ON \`user\` (\`avatarId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_58f5c71eaab331645112cf8cfa5\` FOREIGN KEY (\`avatarId\`) REFERENCES \`public_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_58f5c71eaab331645112cf8cfa5\``);
        await queryRunner.query(`DROP INDEX \`REL_58f5c71eaab331645112cf8cfa\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_58f5c71eaab331645112cf8cfa\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatarId\``);
        await queryRunner.query(`DROP TABLE \`public_file\``);
    }

}
