import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackEntity } from 'src/entities/feedback.entity';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(
    @Body()
    feedback: Partial<FeedbackEntity>,
  ): Promise<FeedbackEntity> {
    return this.feedbackService.createFeedback(feedback);
  }
  
//http://localhost:3000/feedback
  @Get()
  async findAll(): Promise<FeedbackEntity[]> {
    return this.feedbackService.findAll();
  }

//http://localhost:3000/feedback/evaluated/id
//c4fba15e-d9cb-42cd-988b-02cf680cab3e
  @Get('/evaluated/:id')
  async findAllByEvaluated(@Param('id') evaluatedId: string): Promise<any[]> {
    return this.feedbackService.findAllByEvaluated(evaluatedId);
  }
//http://localhost:3000/feedback/evaluated/id
//aafd502f-5329-4fe2-9f46-8c132c56d6a3
  @Get('/evaluator/:id')
  async findAllByEvaluator(@Param('id') evaluatorId: string): Promise<any[]> {
    return this.feedbackService.findAllByEvaluator(evaluatorId);
  }
//http://localhost:3000/feedback/average-rate/id
//c4fba15e-d9cb-42cd-988b-02cf680cab3e
//neu là 4.5 trở lên sẽ làm tròn lên 5 nhe 
  @Get('/average-rate/:id')
  async showAverageRate(@Param('id') evaluatedId: string): Promise<any> {
    return this.feedbackService.showAverageRate(evaluatedId);
  }
}
