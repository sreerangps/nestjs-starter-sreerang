import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RulesService } from './rules.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@ApiTags('rules')
@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rule (Admin)' })
  @ApiResponse({ status: 201, description: 'Rule successfully created' })
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.rulesService.create(createRuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rules or filter by policy' })
  @ApiQuery({ name: 'policyId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of rules' })
  findAll(@Query('policyId') policyId?: string) {
    if (policyId) {
      return this.rulesService.findByPolicy(parseInt(policyId, 10));
    }
    return this.rulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rule by ID' })
  @ApiResponse({ status: 200, description: 'Rule details' })
  @ApiResponse({ status: 404, description: 'Rule not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update rule (Admin)' })
  @ApiResponse({ status: 200, description: 'Rule successfully updated' })
  @ApiResponse({ status: 404, description: 'Rule not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRuleDto: UpdateRuleDto,
  ) {
    return this.rulesService.update(id, updateRuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete rule (Admin)' })
  @ApiResponse({ status: 200, description: 'Rule successfully deleted' })
  @ApiResponse({ status: 404, description: 'Rule not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rulesService.remove(id);
  }
}
