import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '123456789012',
    description: '12-digit Aadhaar number',
  })
  @IsString()
  @Matches(/^\d{12}$/, { message: 'Aadhaar must be a 12-digit number' })
  aadhaar: string;

  @ApiProperty({ enum: UserRole, default: UserRole.CUSTOMER, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
