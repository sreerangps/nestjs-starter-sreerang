import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const application =
      this.applicationsRepository.create(createApplicationDto);
    return this.applicationsRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationsRepository.find({
      relations: ['user', 'policy'],
    });
  }

  async findByUser(userId: number): Promise<Application[]> {
    return this.applicationsRepository.find({
      where: { userId },
      relations: ['user', 'policy'],
    });
  }

  async findOne(id: number): Promise<Application> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
      relations: ['user', 'policy'],
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async update(
    id: number,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    const application = await this.findOne(id);
    Object.assign(application, updateApplicationDto);
    return this.applicationsRepository.save(application);
  }

  async remove(id: number): Promise<void> {
    const application = await this.findOne(id);
    await this.applicationsRepository.remove(application);
  }
}
