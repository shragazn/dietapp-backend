import { OmitType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './create-workout.dto';

export class UpdateWorkoutDto extends OmitType(CreateWorkoutDto, ['userId']) {}
