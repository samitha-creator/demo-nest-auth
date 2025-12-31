import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../entities/Review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = this.reviewsRepository.create({
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      taskId: createReviewDto.taskId,
      fromUserId: createReviewDto.fromUserId,
      toUserId: createReviewDto.toUserId,
    });
    return this.reviewsRepository.save(review);
  }
}
