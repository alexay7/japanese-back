import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ExerciseRequestDto } from './dto/request-exercises.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async getTest(@Body() body: ExerciseRequestDto) {
    if (!body.questionNum) {
      body.questionNum = 10;
    }
    switch (body.type) {
      case 'normal': {
        if (body.category) {
          return this.exercisesService.generateCategoryTest(
            body.level,
            body.category,
            body.questionNum,
          );
        } else if (body.sections && body.sections.length > 0) {
          return this.exercisesService.generateSectionTest(
            body.level,
            body.sections,
            body.questionNum,
          );
        } else {
            return this.exercisesService.generateRandomTest(
                body.level,
                body.questionNum,
            );
        }
      }
      case 'real': {
        if (!body.year || !body.period) {
          throw new BadRequestException();
        }
        return this.exercisesService.getRealTest(
          body.level,
          body.year,
          body.period,
        );
      }
    }
  }
}