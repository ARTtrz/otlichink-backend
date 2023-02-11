import { MigrationInterface, QueryRunner } from "typeorm";

export class PriceProblemSolution1673072084534 implements MigrationInterface {
    name = 'PriceProblemSolution1673072084534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`middle_price\` \`middle_price\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`middle_price\` \`middle_price\` int NOT NULL`);
    }

}
