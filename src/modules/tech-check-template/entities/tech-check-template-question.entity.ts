import { TECH_CHECK_TEMPLATE_QUESTION_TABLE_NAME } from '../../../migrations/1672253373605-CreateTechCheckTemplateQuestionTable';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TECH_CHECK_TEMPLATE_QUESTION_TABLE_NAME)
export class TechCheckTemplateQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  techCheckTemplateId: string;

  @Column('uuid')
  questionId: string;
}
