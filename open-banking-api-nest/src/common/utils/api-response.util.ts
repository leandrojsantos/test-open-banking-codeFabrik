import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message: string;

    @ApiProperty()
    data?: T;

    @ApiProperty()
    timestamp: string;

    constructor(success: boolean, message: string, data?: T) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }

    static success<T>(message: string, data?: T): ApiResponse<T> {
        return new ApiResponse(true, message, data);
    }

    static error<T>(message: string, data?: T): ApiResponse<T> {
        return new ApiResponse(false, message, data);
    }
}