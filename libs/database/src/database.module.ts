import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService, Environment } from '@libs/config';

import { CampaignReport } from './entities';
import { CampaignReportsRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.db.host,
        port: configService.db.port,
        username: configService.db.username,
        password: configService.db.password,
        database: configService.db.database,
        entities: [__dirname + '/entities/*.entity.ts'],
        migrations: [__dirname + '/migrations/*-migration.ts'],
        migrationsTableName: 'migrations',
        logging: configService.app.environment === Environment.DEVELOPMENT,
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
