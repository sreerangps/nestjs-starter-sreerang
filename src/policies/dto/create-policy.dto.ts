import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePolicyDto {
  @ApiProperty({ example: 'Basic Health Cover' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Comprehensive health insurance for individuals' })
  @IsString()
  description: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(0)
  premium: number;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @Min(0)
  coverageAmount: number;

  @ApiProperty({ example: 12 })
  @IsNumber()
  @Min(1)
  durationMonths: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
