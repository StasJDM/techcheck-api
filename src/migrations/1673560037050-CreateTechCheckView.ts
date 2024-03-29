import { MigrationInterface, QueryRunner } from 'typeorm';

export const TECH_CHECK_VIEW_NAME = 'v_tech_checks';

export class CreateTechCheckView1673560037050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE VIEW ${TECH_CHECK_VIEW_NAME} AS
        SELECT tc.*,
            COUNT(*)       AS questions_count,
            AVG(tc_q.mark) AS mark
        FROM tech_check tc
                LEFT JOIN tech_check_question tc_q
                        ON tc.id = tc_q.tech_check_id
        WHERE tc.deleted_at IS NULL
        GROUP BY tc.id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS ${TECH_CHECK_VIEW_NAME};`);
  }
}
