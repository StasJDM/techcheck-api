import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { QUESTION_TABLE_NAME } from './1671382531318-CreateQuestionTable';
import { TECH_CHECK_TABLE_NAME } from './1673131403241-CreateTechCheckTable';

export const TECH_CHECK_QUESTION_TABLE_NAME = 'tech_check_question';

export class CreateTechCheckQuestionTable1673131412176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TECH_CHECK_QUESTION_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tech_check_id',
            type: 'uuid',
          },
          {
            name: 'question_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['tech_check_id'],
            referencedTableName: TECH_CHECK_TABLE_NAME,
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['question_id'],
            referencedTableName: QUESTION_TABLE_NAME,
            referencedColumnNames: ['id'],
          },
        ],
        uniques: [
          {
            name: `${TECH_CHECK_QUESTION_TABLE_NAME}_composite_key`,
            columnNames: ['tech_check_id', 'question_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TECH_CHECK_QUESTION_TABLE_NAME);
  }
}
