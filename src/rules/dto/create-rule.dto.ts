import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RuleType } from '../entities/rule.entity';

export class CreateRuleDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  policyId: number;

  @ApiProperty({ enum: RuleType, example: RuleType.ELIGIBILITY })
  @IsEnum(RuleType)
  type: RuleType;

  @ApiProperty({ example: 'Age Limit' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Applicant must be between 18 and 65 years old' })
  @IsString()
  description: string;

  @ApiProperty({ example: { minAge: 18, maxAge: 65 }, required: false })
  @IsOptional()
  @IsObject()
  criteria?: Record<string, any>;
}
