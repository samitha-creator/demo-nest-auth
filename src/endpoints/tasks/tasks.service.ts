import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/Task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      budget: createTaskDto.budget,
      ownerId: createTaskDto.ownerId,
    });
    return this.tasksRepository.save(task);
  }

  async findAll() {
    return this.tasksRepository.find({
      relations: ['owner', 'assignee', 'bids'],
    });
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['owner', 'assignee', 'bids'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async assign(id: number, assigneeId: number) {
    await this.tasksRepository.update(id, {
      assigneeId: assigneeId,
      status: 'ASSIGNED',
    });
    return this.findOne(id);
  }

  async complete(id: number) {
    await this.tasksRepository.update(id, {
      status: 'COMPLETED',
    });
    return this.findOne(id);
  }

  async releasePayment(id: number) {
    await this.tasksRepository.update(id, {
      status: 'PAID',
    });
    return this.findOne(id);
  }
}
