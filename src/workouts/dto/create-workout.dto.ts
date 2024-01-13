import { Workout } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkoutDto implements Partial<Workout> {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
