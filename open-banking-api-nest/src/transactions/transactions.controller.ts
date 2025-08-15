import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('accounts/:accountId/transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Param('accountId') accountId: string,
    ) {
        return this.transactionsService.create({
            ...createTransactionDto,
            accountId,
        });
    }

    @Get()
    findAll(@Param('accountId') accountId: string) {
        return this.transactionsService.findAllByAccount(accountId);
    }
}