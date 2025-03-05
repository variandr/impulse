import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignReport } from './entities';
import { CampaignReportsRepository } from './repositories';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        entities: [__dirname + '/entities/*.entity.ts'],
        migrations: [__dirname + '/migrations/*-migration.ts'],
        migrationsTableName: 'migrations',
        logging: configService.get('NODE_ENV') === 'localhost',
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CampaignReport]),
  ],
  providers: [CampaignReportsRepository],
  exports: [TypeOrmModule, CampaignReportsRepository],
})
export class DatabaseModule {}
