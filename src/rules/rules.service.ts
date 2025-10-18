import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from './entities/rule.entity';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private rulesRepository: Repository<Rule>,
  ) {}

  async create(createRuleDto: CreateRuleDto): Promise<Rule> {
    const rule = this.rulesRepository.create(createRuleDto);
    return this.rulesRepository.save(rule);
  }

  async findAll(): Promise<Rule[]> {
    return this.rulesRepository.find({ relations: ['policy'] });
  }

  async findByPolicy(policyId: number): Promise<Rule[]> {
    return this.rulesRepository.find({
      where: { policyId },
      relations: ['policy'],
    });
  }

  async findOne(id: number): Promise<Rule> {
    const rule = await this.rulesRepository.findOne({
      where: { id },
      relations: ['policy'],
    });
    if (!rule) {
      throw new NotFoundException(`Rule with ID ${id} not found`);
    }
    return rule;
  }

  async update(id: number, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    const rule = await this.findOne(id);
    Object.assign(rule, updateRuleDto);
    return this.rulesRepository.save(rule);
  }

  async remove(id: number): Promise<void> {
    const rule = await this.findOne(id);
    await this.rulesRepository.remove(rule);
  }
}
