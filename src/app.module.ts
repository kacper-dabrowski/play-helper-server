import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRequest } from './support-requests/support-requests.entity';
import { SupportRequestsModule } from './support-requests/support-requests.module';

console.log(process.env.MONGODB_URL);

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    SupportRequestsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          entities: [SupportRequest],
          type: 'mongodb',
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          port: 27017,
          url: configService.get('MONGODB_URL'),
        };
      },
    }),
  ],
})
export class AppModule {}
