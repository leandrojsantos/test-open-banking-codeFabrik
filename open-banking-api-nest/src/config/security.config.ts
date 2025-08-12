import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const securityConfig = (): ThrottlerModuleOptions => ({
    throttlers: [{
        limit: 100,
        ttl: 60, // em segundos
    }]
});