import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionModule } from './modules/question/question.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppConfig } from './modules/shared/types/app-config.type';
import { TechCheckTemplateModule } from './modules/tech-check-template/tech-check-template.module';
import { TechCheckModule } from './modules/tech-check/tech-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(AppConfig.POSTGRES_HOST),
        port: configService.get(AppConfig.POSTGRES_PORT),
        username: configService.get(AppConfig.POSTGRES_USER),
        password: configService.get(AppConfig.POSTGRES_PASSWORD),
        database: configService.get(AppConfig.POSTGRES_DB),
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get(AppConfig.RATE_LIMITER_TTL),
        limit: configService.get(AppConfig.RATE_LIMITER_LIMIT),
      }),
    }),
    UserModule,
    SharedModule,
    AuthModule,
    QuestionModule,
    TechCheckTemplateModule,
    TechCheckModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
