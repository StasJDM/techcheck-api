import { TECH_CHECK_QUESTION_TABLE_NAME } from '../../../migrations/1673131412176-CreateTechCheckQuestionTable';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TechCheckEntity } from './tech-check.entity';
import { QuestionEntity } from '../../question/entities/question.entity';

@Entity(TECH_CHECK_QUESTION_TABLE_NAME)
export class TechCheckQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  techCheckId: string;

  @ManyToOne(() => TechCheckEntity, (techCheck) => techCheck.questions)
  techCheck: TechCheckEntity;

  @Column('uuid')
  questionId: string;

  @OneToOne(() => QuestionEntity)
  @JoinColumn()
  question: string;

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
