import { Module } from '@nestjs/common';
import { TechCheckTemplateService } from './tech-check-template.service';
import { TechCheckTemplateController } from './tech-check-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechCheckTemplateEntity } from './entities/tech-check-template.entity';
import { TechCheckTemplateQuestionEntity } from './entities/tech-check-template-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechCheckTemplateEntity, TechCheckTemplateQuestionEntity])],
  controllers: [TechCheckTemplateController],
  providers: [TechCheckTemplateService],
})
export class TechCheckTemplateModule {}
