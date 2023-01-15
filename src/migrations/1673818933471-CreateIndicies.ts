import { MigrationInterface, QueryRunner } from 'typeorm';
import { QUESTION_TABLE_NAME } from './1671382531318-CreateQuestionTable';
import { THEME_TABLE_NAME } from './1671400607436-CreateThemeTable';
import { TECH_CHECK_TEMPLATE_TABLE } from './1672252798849-CreateTechCheckTemplateTable';
import { TECH_CHECK_TABLE_NAME } from './1673131403241-CreateTechCheckTable';

export class CreateIndicies1673818933471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "QUESTION_QUESTION" ON ${QUESTION_TABLE_NAME}(question)`);
    await queryRunner.query(`CREATE INDEX "THEME_TITLE" ON ${THEME_TABLE_NAME}(title)`);
    await queryRunner.query(`CREATE INDEX "TECH_CHECK_TITLE" ON ${TECH_CHECK_TABLE_NAME}(title)`);
    await queryRunner.query(`CREATE INDEX "TECH_CHECK_TEMPLATE_TITLE" ON ${TECH_CHECK_TEMPLATE_TABLE}(title)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "QUESTION_QUESTION"`);
    await queryRunner.query(`DROP INDEX "THEME_TITLE"`);
    await queryRunner.query(`DROP INDEX "TECH_CHECK_TITLE"`);
    await queryRunner.query(`DROP INDEX "TECH_CHECK_TEMPLATE_TITLE"`);
  }
}
