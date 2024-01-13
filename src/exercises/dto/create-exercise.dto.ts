import { Exercise } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExerciseDto implements Partial<Exercise> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  workoutId: string;
}
