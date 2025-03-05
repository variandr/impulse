import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741073379520 implements MigrationInterface {
  name = 'Migration1741073379520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "campaign_reports"
                             (
                                 "id"          SERIAL            NOT NULL,
                                 "campaign"    character varying NOT NULL,
                                 "campaign_id" character varying NOT NULL,
                                 "adgroup"     character varying NOT NULL,
                                 "adgroup_id"  character varying NOT NULL,
                                 "ad"          character varying NOT NULL,
                                 "ad_id"       character varying NOT NULL,
                                 "client_id"   character varying NOT NULL,
                                 "event_name"  character varying NOT NULL,
                                 "event_time"  TIMESTAMP         NOT NULL,
                                 CONSTRAINT "UQ_fc41bf2b50409288b16abc29b78" UNIQUE ("event_time", "client_id", "event_name"),
                                 CONSTRAINT "PK_d4f9d11076c9b736d3e1473b32f" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "campaign_reports"`);
  }
}
