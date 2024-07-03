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

  async createFeedback(feedback: Partial<FeedbackEntity>): Promise<FeedbackEntity> {
    const newFeedback = this.feedbackRepository.create(feedback);
    return this.feedbackRepository.save(newFeedback);
  }

  async findAll(): Promise<FeedbackEntity[]> {
    return this.feedbackRepository.find({ relations: ['evaluator', 'evaluated'] });
  }

  async findAllByEvaluated(evaluatedId: string): Promise<any[]> {
    const feedbacks = await this.feedbackRepository.find({
      where: { evaluated: { id: evaluatedId } },
      relations: ['evaluator', 'evaluated'],
      select: ['id', 'rating', 'comment'],
    });

    return feedbacks.map(feedback => ({
      id: feedback.id,
      rating: feedback.rating,
      comment: feedback.comment,
      evaluator: {
        id: feedback.evaluator.id,
        username: feedback.evaluator.username,
        email: feedback.evaluator.email,
        avatar: feedback.evaluator.avatar,
      },
      evaluated: {
        id: feedback.evaluated.id,
        username: feedback.evaluated.username,
        email: feedback.evaluated.email,
        phone: feedback.evaluated.phone,
        avatar: feedback.evaluated.avatar,
      },
    }));
  }

  async findAllByEvaluator(evaluatorId: string): Promise<any[]> {
    const feedbacks = await this.feedbackRepository.find({
      where: { evaluator: { id: evaluatorId } },
      relations: ['evaluator', 'evaluated'],
      select: ['id', 'rating', 'comment'],
    });

    return feedbacks.map(feedback => ({
      id: feedback.id,
      rating: feedback.rating,
      comment: feedback.comment,
      evaluator: {
        id: feedback.evaluator.id,
        username: feedback.evaluator.username,
        email: feedback.evaluator.email,
        avatar: feedback.evaluator.avatar,
      },
      evaluated: {
        id: feedback.evaluated.id,
        username: feedback.evaluated.username,
        email: feedback.evaluated.email,
        phone: feedback.evaluated.phone,
        avatar: feedback.evaluated.avatar,
      },
    }));
  }

  async showAverageRate(evaluatedId: string): Promise<any> {
    const feedbacks = await this.feedbackRepository.find({
      where: { evaluated: { id: evaluatedId } },
      relations: ['evaluator'],
      select: ['rating'],
    });

    const averageRate = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;

    const evaluators = feedbacks.map(feedback => ({
      id: feedback.evaluator.id,
      username: feedback.evaluator.username,
      email: feedback.evaluator.email,
      avatar: feedback.evaluator.avatar,
    }));

    return {
      evaluators,
      averageRate,
    };
  }
}
