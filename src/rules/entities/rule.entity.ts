import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Policy } from '../../policies/entities/policy.entity';

export enum RuleType {
  ELIGIBILITY = 'eligibility',
  CONFIG = 'config',
}

@Entity('rules')
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  policyId: number;

  @ManyToOne(() => Policy, (policy) => policy.rules)
  @JoinColumn({ name: 'policyId' })
  policy: Policy;

  @Column({ type: 'text' })
  type: RuleType;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('simple-json', { nullable: true })
  criteria: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
