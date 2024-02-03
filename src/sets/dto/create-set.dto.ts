import { Set } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSetDto implements Partial<Set> {
  @IsString()
  @IsNotEmpty()
  workoutExerciseId: string;

  @IsNumber()
  reps: number;

  @IsNumber()
  weight: number;
}
