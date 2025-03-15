import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { Config } from './config.types';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get app(): Config['app'] {
    return this.configService.get<Config>('app', { infer: true });
  }

  get db(): Config['db'] {
    return this.configService.get<Config>('db', { infer: true });
  }

  get cache(): Config['cache'] {
    return this.configService.get<Config>('cache', { infer: true });
  }

  get auth(): Config['auth'] {
    return this.configService.get<Config>('auth', { infer: true });
  }

  get impulse(): Config['impulse'] {
    return this.configService.get<Config>('impulse', { infer: true });
  }
}
