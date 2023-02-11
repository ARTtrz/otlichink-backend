import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressProblemSolution1673072242646 implements MigrationInterface {
    name = 'AddressProblemSolution1673072242646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
    }

}
