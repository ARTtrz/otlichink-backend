import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedFavorites1672899481953 implements MigrationInterface {
    name = 'AddedFavorites1672899481953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_58f5c71eaab331645112cf8cfa5\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_898b7c5062bb8d6b374e1beda31\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_b71bf40798465cdff44a9803f79\``);
        await queryRunner.query(`DROP INDEX \`IDX_58f5c71eaab331645112cf8cfa\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_58f5c71eaab331645112cf8cfa\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatarId\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`userFavoritesId\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`userIdId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`userIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`userFavoritesId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatarId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_58f5c71eaab331645112cf8cfa\` ON \`user\` (\`avatarId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_58f5c71eaab331645112cf8cfa\` ON \`user\` (\`avatarId\`)`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_b71bf40798465cdff44a9803f79\` FOREIGN KEY (\`userFavoritesId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_898b7c5062bb8d6b374e1beda31\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_58f5c71eaab331645112cf8cfa5\` FOREIGN KEY (\`avatarId\`) REFERENCES \`public_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
