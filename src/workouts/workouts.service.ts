import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createWorkoutDto: CreateWorkoutDto) {
    return this.prisma.workout.create({ data: createWorkoutDto });
  }

  findAll(userId: string) {
    return this.prisma.workout.findMany({
      where: { userId },
      include: { exercises: true },
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
