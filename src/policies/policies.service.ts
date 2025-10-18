import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './entities/policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private policiesRepository: Repository<Policy>,
  ) {}

  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const policy = this.policiesRepository.create(createPolicyDto);
    return this.policiesRepository.save(policy);
  }

  async findAll(): Promise<Policy[]> {
    return this.policiesRepository.find({
      where: { isActive: true },
      relations: ['rules'],
    });
  }

  async findOne(id: number): Promise<Policy> {
    const policy = await this.policiesRepository.findOne({
      where: { id },
      relations: ['rules'],
    });
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    return policy;
  }

  async update(id: number, updatePolicyDto: UpdatePolicyDto): Promise<Policy> {
    const policy = await this.findOne(id);
    Object.assign(policy, updatePolicyDto);
    return this.policiesRepository.save(policy);
  }

  async remove(id: number): Promise<void> {
    const policy = await this.findOne(id);
    await this.policiesRepository.remove(policy);
  }
}
