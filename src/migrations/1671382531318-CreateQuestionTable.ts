import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { USER_TABLE_NAME } from './1658954315540-CreateUserTable';

export const QUESTION_TABLE_NAME = 'question';

export class CreateQuestionTable1671382531318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: QUESTION_TABLE_NAME,
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
            name: 'question',
            type: 'varchar',
          },
          {
            name: 'answer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'creator_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['creator_id'],
            referencedTableName: USER_TABLE_NAME,
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(QUESTION_TABLE_NAME);
  }
}
