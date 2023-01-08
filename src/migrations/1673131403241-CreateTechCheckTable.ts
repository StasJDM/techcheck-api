import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { USER_TABLE_NAME } from './1658954315540-CreateUserTable';
import { TECH_CHECK_TEMPLATE_TABLE } from './1672252798849-CreateTechCheckTemplateTable';

export const TECH_CHECK_TABLE_NAME = 'tech_check';

export class CreateTechCheckTable1673131403241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TECH_CHECK_TABLE_NAME,
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
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'integer',
          },
          {
            name: 'person',
            type: 'varchar',
          },
          {
            name: 'tech_checker_id',
            type: 'uuid',
          },
          {
            name: 'tech_check_template_id',
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
            columnNames: ['tech_checker_id'],
            referencedTableName: USER_TABLE_NAME,
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['tech_check_template_id'],
            referencedTableName: TECH_CHECK_TEMPLATE_TABLE,
            referencedColumnNames: ['id'],
          },
        ],
        uniques: [
          {
            name: `${TECH_CHECK_TABLE_NAME}_unique_title_and_tech_checker`,
            columnNames: ['title', 'tech_checker_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TECH_CHECK_TABLE_NAME);
  }
}
