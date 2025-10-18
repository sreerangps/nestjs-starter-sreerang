import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PoliciesModule } from './policies/policies.module';
import { RulesModule } from './rules/rules.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PoliciesModule,
    RulesModule,
    ApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
