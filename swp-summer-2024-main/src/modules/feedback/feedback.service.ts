// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { FeedbackEntity } from 'src/entities/feedback.entity';

// @Injectable()
// export class FeedbackService {
//   constructor(
//     @InjectRepository(FeedbackEntity)
//     private feedbackRepository: Repository<FeedbackEntity>,
//   ) {}

//   async createFeedback(feedback: Partial<FeedbackEntity>): Promise<FeedbackEntity> {
//     const newFeedback = this.feedbackRepository.create(feedback);
//     return this.feedbackRepository.save(newFeedback);
//   }

//   async findAll(): Promise<FeedbackEntity[]> {
//     return this.feedbackRepository.find({ relations: ['evaluator', 'evaluated'] });
//   }

//   async findAllByEvaluated(evaluatedId: string): Promise<FeedbackEntity[]> {
//     return this.feedbackRepository.find({
//       where: { evaluated: { id: evaluatedId } },
//       relations: ['evaluator', 'evaluated'],
//     });
//   }

//   async findAllByEvaluator(evaluatorId: string): Promise<FeedbackEntity[]> {
//     return this.feedbackRepository.find({
//       where: { evaluator: { id: evaluatorId } },
//       relations: ['evaluator', 'evaluated'],
//     });
//   }
// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackEntity } from 'src/entities/feedback.entity';
import { AccountEntity } from 'src/entities/account.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async createFeedback(
    feedback: Partial<FeedbackEntity>,
  ): Promise<FeedbackEntity> {
    const newFeedback = this.feedbackRepository.create(feedback);
    return this.feedbackRepository.save(newFeedback);
  }

  async findAll(): Promise<FeedbackEntity[]> {
    return this.feedbackRepository.find({
      order: {
        createdAt: -1,
      },
    });
  }

  async findAllByEvaluated(evaluatedId: string): Promise<any[]> {
    return await this.feedbackRepository.find({
      where: { evaluated: { id: evaluatedId } },
      order: {
        createdAt: -1,
      },
    });
  }

  async findAllByEvaluator(evaluatorId: string): Promise<any[]> {
    return await this.feedbackRepository.find({
      where: { evaluator: { id: evaluatorId } },
      order: {
        createdAt: -1,
      },
    });
  }

  async showAverageRate(evaluatedId: string): Promise<any> {
    const feedbacks = await this.feedbackRepository.find({
      where: { evaluated: { id: evaluatedId } },
      order: {
        createdAt: -1,
      },
    });

    const countRating = await this.feedbackRepository
      .createQueryBuilder('feedback')
      .where('feedback.evaluated.id = :id', {
        id: evaluatedId,
      })
      .getCount();

    const averageRate =
      feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
      feedbacks.length;

    return {
      feedbacks,
      averageRate,
      countRating,
    };
  }
}
