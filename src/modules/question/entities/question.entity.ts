import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ThemeEntity } from './theme.entity';
import { THEME_QUESTION_TABLE } from '../../../migrations/1671401833260-CreateThemeQuestionTable';

@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column({ nullable: true })
  answer?: string;

  @Column({ type: 'uuid' })
  creatorId: string;

  @ManyToOne(() => User)
  @JoinTable()
  creator: User;

  @ManyToMany(() => ThemeEntity, (theme) => theme.questions)
  @JoinTable({ name: THEME_QUESTION_TABLE })
  themes: ThemeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
