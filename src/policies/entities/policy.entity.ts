import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Rule } from '../../rules/entities/rule.entity';
import { Application } from '../../applications/entities/application.entity';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  premium: number;

  @Column('decimal', { precision: 15, scale: 2 })
  coverageAmount: number;

  @Column('int')
  durationMonths: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Rule, (rule) => rule.policy)
  rules: Rule[];

  @OneToMany(() => Application, (application) => application.policy)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
