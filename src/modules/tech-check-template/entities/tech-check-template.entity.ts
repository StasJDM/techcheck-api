import { QuestionEntity } from '../../question/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TECH_CHECK_TEMPLATE_QUESTION_TABLE_NAME } from '../../../migrations/1672253373605-CreateTechCheckTemplateQuestionTable';
import { User } from '../../../modules/user/entities/user.entity';
import { TECH_CHECK_TEMPLATE_TABLE } from '../../../migrations/1672252798849-CreateTechCheckTemplateTable';

@Entity(TECH_CHECK_TEMPLATE_TABLE)
export class TechCheckTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => QuestionEntity)
  @JoinTable({ name: TECH_CHECK_TEMPLATE_QUESTION_TABLE_NAME })
  questions: QuestionEntity[];

  @ManyToOne(() => User)
  owner: string;

  @Column({ type: 'uuid' })
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
