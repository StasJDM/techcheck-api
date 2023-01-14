import { TECH_CHECK_TABLE_NAME } from '../../../migrations/1673131403241-CreateTechCheckTable';
import { QuestionEntity } from '../../question/entities/question.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TechCheckTemplateEntity } from '../../tech-check-template/entities/tech-check-template.entity';
import { TechCheckQuestionEntity } from './tech-check-question.entity';

export enum TechCheckType {
  FromTemplate,
  RealTime,
}

export enum TechCheckStatus {
  Created,
  InProgress,
  Canceled,
  Finished,
  Restarted,
}

@Entity(TECH_CHECK_TABLE_NAME)
export class TechCheckEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ enum: TechCheckType })
  type: TechCheckType;

  @Column()
  person: string;

  @Column({ enum: TechCheckStatus, default: TechCheckStatus.Created })
  status: TechCheckStatus;

  @ManyToOne(() => User)
  techChecker: User;

  @Column('uuid')
  techCheckerId: string;

  @ManyToOne(() => TechCheckTemplateEntity)
  techCheckTemplate: TechCheckTemplateEntity;

  @Column('uuid')
  techCheckTemplateId: string;

  @OneToMany(() => TechCheckQuestionEntity, (techCheckQuestion) => techCheckQuestion.techCheck)
  questions: QuestionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
