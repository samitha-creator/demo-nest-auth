import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from '../../entities/Bid.entity';
import { CreateBidDto } from './dto/create-bid.dto';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>,
  ) {}

  async create(taskId: number, createBidDto: CreateBidDto) {
    const bid = this.bidsRepository.create({
      amount: createBidDto.amount,
      taskId: taskId,
      bidderId: createBidDto.bidderId,
    });
    return this.bidsRepository.save(bid);
  }

  async findAll(taskId: number) {
    return this.bidsRepository.find({
      where: { taskId },
      relations: ['bidder'],
    });
  }
}
