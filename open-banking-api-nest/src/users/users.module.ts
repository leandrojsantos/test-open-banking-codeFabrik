import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],  // Registra a entidade User
    providers: [UsersService],
    exports: [UsersService],                      // Exporta para outros módulos
})
export class UsersModule { }