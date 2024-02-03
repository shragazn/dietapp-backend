import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService, PrismaService],
})
export class WorkoutsModule {}
