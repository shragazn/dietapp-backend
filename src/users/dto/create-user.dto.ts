import { User } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
