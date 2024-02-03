import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutPlan } from '@prisma/client';
import { CreatePlanDto } from './dto/create-plan.dto';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}
  getPlansByUser(userId: string): Promise<WorkoutPlan[]> {
    return this.prisma.workoutPlan.findMany({
      where: { userId },
      include: { exercises: true },
    });
  }

  getPlan(id: string): Promise<WorkoutPlan> {
    return this.prisma.workoutPlan.findUnique({
      where: { id },
      include: { exercises: true },
    });
  }

  createPlan(createPlanDto: CreatePlanDto): Promise<WorkoutPlan> {
    return this.prisma.workoutPlan.create({ data: createPlanDto });
  }

  updatePlan(id: string, updatePlanDto: UpdatePlanDto): Promise<WorkoutPlan> {
    return this.prisma.workoutPlan.update({
      where: { id },
      data: updatePlanDto,
    });
  }

  deletePlan(id: string): Promise<WorkoutPlan> {
    return this.prisma.workoutPlan.delete({ where: { id } });
  }

  addExerciseToPlan(
    planId: string,
    addExerciseDto: AddExerciseDto,
  ): Promise<WorkoutPlan> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { planId: _, ...exerciseData } = addExerciseDto;
    return this.prisma.workoutPlan.update({
      where: { id: planId },
      data: { exercises: { create: exerciseData } },
    });
  }

  async removeExerciseFromPlan(
    planId: string,
    exerciseId: string,
  ): Promise<WorkoutPlan> {
    return this.prisma.workoutPlan.update({
      where: { id: planId },
      data: { exercises: { delete: { id: exerciseId } } },
    });
  }
}
