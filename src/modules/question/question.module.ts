import { Module } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { ThemeControllers } from './controllers/theme.controller';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeService } from './services/theme.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, ThemeEntity])],
  controllers: [QuestionController, ThemeControllers],
  providers: [QuestionService, ThemeService],
})
export class QuestionModule {}
