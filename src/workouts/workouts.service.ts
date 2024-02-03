import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto) {
    const workoutPlan = await this.prisma.workoutPlan.findUnique({
      where: { id: createWorkoutDto.planId },
      include: { exercises: true },
    });
    if (!workoutPlan) {
      throw new NotFoundException('Workout plan not found');
    }

    const previousWorkout = await this.prisma.workout.findFirst({
      where: { planId: createWorkoutDto.planId },
      orderBy: { date: 'desc' },
      select: {
        exercises: {
          select: { name: true, sets: { select: { weight: true } } },
        },
      },
    });

    return this.prisma.workout.create({
      data: {
        ...createWorkoutDto,
        exercises: {
          createMany: {
            data: workoutPlan.exercises.map((exercise) => ({
              name: exercise.name,
              sets: {
                createMany: {
                  data: Array.from({ length: exercise.sets }).map(
                    (_, setNumber) => ({
                      reps: exercise.reps,
                      weight:
                        previousWorkout?.exercises.find(
                          (e) => e.name === exercise.name,
                        )?.sets[setNumber]?.weight || 0,
                    }),
                  ),
                },
              },
            })),
          },
        },
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.workout.findMany({
      where: { userId },
    });
  }

  findOne(id: string) {
    return this.prisma.workout.findUnique({
      where: { id },
      include: { exercises: { include: { sets: true } } },
    });
  }

  update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    return this.prisma.workout.update({
      where: { id },
      data: updateWorkoutDto,
    });
  }

  remove(id: string) {
    return this.prisma.workout.delete({ where: { id } });
  }
}
