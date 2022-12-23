import { Module } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { ThemeControllers } from './controllers/theme.controller';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeService } from './services/theme.service';
import { QuestionRepository } from './repositories/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, ThemeEntity])],
  controllers: [QuestionController, ThemeControllers],
  providers: [QuestionService, ThemeService, QuestionRepository],
})
export class QuestionModule {}
