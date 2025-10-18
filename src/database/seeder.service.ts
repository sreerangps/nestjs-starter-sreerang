import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../policies/entities/policy.entity';
import { Rule, RuleType } from '../rules/entities/rule.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Policy)
    private policiesRepository: Repository<Policy>,
    @InjectRepository(Rule)
    private rulesRepository: Repository<Rule>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    // Check if data already exists
    const existingPolicies = await this.policiesRepository.count();
    if (existingPolicies > 0) {
      return; // Data already seeded
    }

    // Seed Policies
    const policies = [
      {
        name: 'Basic Health Cover',
        description: 'Comprehensive health insurance for individuals covering hospitalization and treatment expenses',
        premium: 5000,
        coverageAmount: 500000,
        durationMonths: 12,
        isActive: true,
      },
      {
        name: 'Family Health Plan',
        description: 'Extended coverage for entire family including spouse and children',
        premium: 12000,
        coverageAmount: 1000000,
        durationMonths: 12,
        isActive: true,
      },
      {
        name: 'Senior Citizen Health Shield',
        description: 'Specialized health insurance for senior citizens with additional benefits',
        premium: 8000,
        coverageAmount: 750000,
        durationMonths: 12,
        isActive: true,
      },
      {
        name: 'Critical Illness Cover',
        description: 'Comprehensive coverage for critical illnesses including cancer, heart diseases',
        premium: 15000,
        coverageAmount: 2000000,
        durationMonths: 24,
        isActive: true,
      },
    ];

    const savedPolicies = await this.policiesRepository.save(policies);

    // Seed Rules
    const rules = [
      // Basic Health Cover rules
      {
        policyId: savedPolicies[0].id,
        type: RuleType.ELIGIBILITY,
        name: 'Age Limit',
        description: 'Applicant must be between 18 and 65 years old',
        criteria: { minAge: 18, maxAge: 65 },
      },
      {
        policyId: savedPolicies[0].id,
        type: RuleType.CONFIG,
        name: 'Claim Limit',
        description: 'Maximum 3 claims per year',
        criteria: { maxClaimsPerYear: 3 },
      },
      // Family Health Plan rules
      {
        policyId: savedPolicies[1].id,
        type: RuleType.ELIGIBILITY,
        name: 'Family Size',
        description: 'Coverage for up to 5 family members',
        criteria: { maxMembers: 5 },
      },
      {
        policyId: savedPolicies[1].id,
        type: RuleType.ELIGIBILITY,
        name: 'Age Limit',
        description: 'Primary applicant must be between 21 and 60 years old',
        criteria: { minAge: 21, maxAge: 60 },
      },
      // Senior Citizen rules
      {
        policyId: savedPolicies[2].id,
        type: RuleType.ELIGIBILITY,
        name: 'Age Requirement',
        description: 'Applicant must be 60 years or older',
        criteria: { minAge: 60 },
      },
      {
        policyId: savedPolicies[2].id,
        type: RuleType.CONFIG,
        name: 'Pre-existing Conditions',
        description: 'Coverage for pre-existing conditions after 2 years',
        criteria: { preExistingWaitingPeriodMonths: 24 },
      },
      // Critical Illness rules
      {
        policyId: savedPolicies[3].id,
        type: RuleType.ELIGIBILITY,
        name: 'Age Limit',
        description: 'Applicant must be between 18 and 70 years old',
        criteria: { minAge: 18, maxAge: 70 },
      },
      {
        policyId: savedPolicies[3].id,
        type: RuleType.CONFIG,
        name: 'Waiting Period',
        description: 'Waiting period of 90 days for claims',
        criteria: { waitingPeriodDays: 90 },
      },
    ];

    await this.rulesRepository.save(rules);
    console.log('Database seeded with sample policies and rules');
  }
}
