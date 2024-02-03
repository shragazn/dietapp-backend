import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WorkoutPlan } from '@prisma/client';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  getPlans(@Query('userId') userId: string): Promise<WorkoutPlan[]> {
    return this.plansService.getPlansByUser(userId);
  }

  @Get(':id')
  getPlan(@Param('id') planId: string): Promise<WorkoutPlan> {
    return this.plansService.getPlan(planId);
  }

  @Post()
  createPlan(@Body() planDto: CreatePlanDto): Promise<WorkoutPlan> {
    return this.plansService.createPlan(planDto);
  }

  @Put(':id')
  updatePlan(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ): Promise<WorkoutPlan> {
    return this.plansService.updatePlan(id, updatePlanDto);
  }

  @Delete(':id')
  deletePlan(@Param('id') id: string): Promise<WorkoutPlan> {
    return this.plansService.deletePlan(id);
  }

  @Post(':id/exercises')
  addExerciseToPlan(
    @Param('id') planId: string,
    @Body() addExerciseDto: AddExerciseDto,
  ): Promise<WorkoutPlan> {
    return this.plansService.addExerciseToPlan(planId, addExerciseDto);
  }

  @Delete(':id/exercises/:exerciseId')
  removeExerciseFromPlan(
    @Param('id') planId: string,
    @Param('exerciseId') exerciseId: string,
  ): Promise<WorkoutPlan> {
    return this.plansService.removeExerciseFromPlan(planId, exerciseId);
  }
}
