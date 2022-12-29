import { Module } from '@nestjs/common';
import { TechCheckTemplateService } from './tech-check-template.service';
import { TechCheckTemplateController } from './tech-check-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechCheckTemplateEntity } from './entities/tech-check-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechCheckTemplateEntity])],
  controllers: [TechCheckTemplateController],
  providers: [TechCheckTemplateService],
})
export class TechCheckTemplateModule {}
