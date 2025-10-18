import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Policy } from '../policies/entities/policy.entity';
import { Rule } from '../rules/entities/rule.entity';
import { Application } from '../applications/entities/application.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'health-insurance.db',
      entities: [User, Policy, Rule, Application],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([Policy, Rule]),
  ],
  providers: [SeederService],
})
export class DatabaseModule {}
