import { Set } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateSetDto implements Partial<Set> {
  @IsString()
  @IsNotEmpty()
  exerciseId: string;

  @IsNumber()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(1)
  weight: number;
}
