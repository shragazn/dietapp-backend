import { Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SetsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSetDto: CreateSetDto) {
    return this.prisma.set.create({ data: createSetDto });
  }

  update(id: string, updateSetDto: UpdateSetDto) {
    return this.prisma.set.update({ where: { id }, data: updateSetDto });
  }

  remove(id: string) {
    return this.prisma.set.delete({ where: { id } });
  }
}
