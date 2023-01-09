import { Module } from '@nestjs/common';
import { TechCheckService } from './tech-check.service';
import { TechCheckController } from './tech-check.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechCheckEntity } from './entities/tech-check.entity';
import { TechCheckQuestionEntity } from './entities/tech-check-question.entity';
import { TechCheckTemplateModule } from '../tech-check-template/tech-check-template.module';

@Module({
  imports: [TypeOrmModule.forFeature([TechCheckEntity, TechCheckQuestionEntity]), TechCheckTemplateModule],
  controllers: [TechCheckController],
  providers: [TechCheckService],
})
export class TechCheckModule {}
