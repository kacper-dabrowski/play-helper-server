import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRequest } from './support-requests/support-requests.entity';
import { SupportRequestsModule } from './support-requests/support-requests.module';
import { SolutionsModule } from './solutions/solutions.module';
import { Solution } from './solutions/solution.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          entities: [SupportRequest, Solution],
          type: 'mongodb',
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          port: 27017,
          url: configService.get('MONGODB_URL'),
        };
      },
    }),
    SupportRequestsModule,
    SolutionsModule,
  ],
})
export class AppModule {}
