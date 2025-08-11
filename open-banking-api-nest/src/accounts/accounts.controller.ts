import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Post()
    async create(
        @Body() createAccountDto: CreateAccountDto,
        @CurrentUser() user: User,
    ) {
        return this.accountsService.create(createAccountDto, user.id);
    }

    @Get()
    async findAll(@CurrentUser() user: User) {
        return this.accountsService.findAllByUser(user.id);
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: User,
    ) {
        return this.accountsService.findOne(id, user.id);
    }
}