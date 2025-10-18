import { IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  policyId: number;

  @ApiProperty({
    example: '123456789012',
    description: '12-digit Aadhaar number',
  })
  @IsString()
  @Matches(/^\d{12}$/, { message: 'Aadhaar must be a 12-digit number' })
  aadhaar: string;
}
