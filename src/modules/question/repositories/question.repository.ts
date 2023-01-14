import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { THEME_QUESTION_TABLE } from '../../../migrations/1671401833260-CreateThemeQuestionTable';
import { QueryFailedError, Repository } from 'typeorm';
import { QuestionEntity } from '../entities/question.entity';

@Injectable()
export class QuestionRepository extends Repository<QuestionEntity> {
  constructor(@InjectRepository(QuestionEntity) repository: Repository<QuestionEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async addTheme(questionId: string, themeId: string): Promise<void> {
    try {
      await this.query(`INSERT INTO ${THEME_QUESTION_TABLE}(theme_id, question_id) VALUES ('${themeId}', '${questionId}')`);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        // TODO: create common error-handling
        const error = e.driverError;

        switch (error.code) {
          case '23505':
            throw new ConflictException();
          case '23503':
            throw new BadRequestException('Invalid themeId or questionId');
          default:
            throw new InternalServerErrorException();
        }
      }
    }
  }

  public async removeTheme(questionId: string, themeId: string): Promise<void> {
    await this.query(`DELETE FROM ${THEME_QUESTION_TABLE} WHERE theme_id = '${themeId}' AND question_id = '${questionId}'`);
  }
}
