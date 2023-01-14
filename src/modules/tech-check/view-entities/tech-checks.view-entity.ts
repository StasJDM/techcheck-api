import { TECH_CHECK_VIEW_NAME } from '../../../migrations/1673560037050-CreateTechCheckView';
import { ViewColumn, ViewEntity } from 'typeorm';
import { TechCheckStatus, TechCheckType } from '../entities/tech-check.entity';

@ViewEntity(TECH_CHECK_VIEW_NAME)
export class TechCheckViewEntity {
  @ViewColumn()
  id: string;

  @ViewColumn()
  title: string;

  @ViewColumn()
  description?: string;

  @ViewColumn()
  type: TechCheckType;

  @ViewColumn()
  person: string;

  @ViewColumn()
  status: TechCheckStatus;

  @ViewColumn()
  questionsCount: number;

  @ViewColumn()
  mark: number;

  @ViewColumn()
  techCheckerId: string;

  @ViewColumn()
  techCheckTemplateId: string;

  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  updatedAt: Date;
}
