import { TECH_CHECK_QUESTION_TABLE_NAME } from '../../../migrations/1673131412176-CreateTechCheckQuestionTable';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(TECH_CHECK_QUESTION_TABLE_NAME)
export class TechCheckQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  techCheckId: string;

  @Column('uuid')
  questionId: string;

  @Column({ nullable: true })
  mark?: number;

  @Column({ nullable: true })
  note?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
