import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransferDto } from './dto/transfer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts/:accountId/transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    async create(
        @Param('accountId', ParseUUIDPipe) accountId: string,
        @Body() createTransactionDto: CreateTransactionDto,
        @CurrentUser() user: User,
    ) {
        return this.transactionsService.create(createTransactionDto, accountId);
    }

    @Post('transfer')
    async transfer(
        @Param('accountId', ParseUUIDPipe) accountId: string,
        @Body() transferDto: TransferDto,
        @CurrentUser() user: User,
    ) {
        return this.transactionsService.transfer(transferDto, accountId);
    }

    @Get()
    async findAll(
        @Param('accountId', ParseUUIDPipe) accountId: string,
        @CurrentUser() user: User,
    ) {
        return this.transactionsService.findAllByAccount(accountId);
    }
}