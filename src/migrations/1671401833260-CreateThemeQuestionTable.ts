import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { QUESTION_TABLE_NAME } from './1671382531318-CreateQuestionTable';
import { THEME_TABLE_NAME } from './1671400607436-CreateThemeTable';

export const THEME_QUESTION_TABLE = 'theme_question';

export class CreateThemeQuestionTable1671401833260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: THEME_QUESTION_TABLE,
        columns: [
          {
            name: 'theme_id',
            type: 'uuid',
          },
          {
            name: 'question_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['theme_id'],
            referencedTableName: THEME_TABLE_NAME,
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
            name: 'theme_question_composite_key',
            columnNames: ['theme_id', 'question_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(THEME_QUESTION_TABLE);
  }
}
