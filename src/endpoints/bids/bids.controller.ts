import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('tasks/:taskId/bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  create(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() createBidDto: CreateBidDto,
  ) {
    return this.bidsService.create(taskId, createBidDto);
  }

  @Get()
  findAll(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.bidsService.findAll(taskId);
  }
}
