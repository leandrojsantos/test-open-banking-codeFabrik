import { HelmetOptions } from 'helmet';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const helmetConfig: HelmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [`'self'`],
            styleSrc: [`'self'`, `'unsafe-inline'`],
            imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
    },
};

export const throttlerConfig: ThrottlerModuleOptions = {
    ttl: 60,
    limit: 100,
};