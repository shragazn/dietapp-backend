import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  planId: string;

  @IsNumber()
  sets: number;

  @IsNumber()
  reps: number;
}
