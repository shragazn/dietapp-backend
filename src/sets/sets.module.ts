import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SetsController],
  providers: [SetsService, PrismaService],
})
export class SetsModule {}
