import { MigrationInterface, QueryRunner } from "typeorm";

export class CardChangesDefault1673072532077 implements MigrationInterface {
    name = 'CardChangesDefault1673072532077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`views\` \`views\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`middle_price\` \`middle_price\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`middle_price\` \`middle_price\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`views\` \`views\` int NULL`);
    }

}
