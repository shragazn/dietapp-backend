import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { ExercisesModule } from './exercises/exercises.module';
import { SetsModule } from './sets/sets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    WorkoutsModule,
    ExercisesModule,
    SetsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
