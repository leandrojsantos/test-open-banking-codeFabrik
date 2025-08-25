import { IsEnum, IsOptional } from 'class-validator';
import { AccountType } from '../enums/account-type.enum';

export class CreateAccountDto {
    @IsEnum(AccountType)
    @IsOptional()
    type?: AccountType = AccountType.CHECKING;
}