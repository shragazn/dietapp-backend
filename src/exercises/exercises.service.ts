import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.create({ data: createExerciseDto });
  }

  findAll(workoutId: string) {
    return this.prisma.exercise.findMany({
      where: { workoutId },
      include: { sets: true },
    });
  }

  findOne(id: string) {
    return this.prisma.exercise.findUnique({ where: { id } });
  }

  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  remove(id: string) {
    return this.prisma.exercise.delete({ where: { id } });
  }
}
