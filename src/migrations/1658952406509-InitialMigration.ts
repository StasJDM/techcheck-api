import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1658952406509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // It needs to using uuid_generate_v4() in migrations
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
