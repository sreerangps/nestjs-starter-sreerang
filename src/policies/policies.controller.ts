import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@ApiTags('policies')
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new policy (Admin)' })
  @ApiResponse({ status: 201, description: 'Policy successfully created' })
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(createPolicyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active policies' })
  @ApiResponse({ status: 200, description: 'List of active policies' })
  findAll() {
    return this.policiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get policy by ID' })
  @ApiResponse({ status: 200, description: 'Policy details' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.policiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update policy (Admin)' })
  @ApiResponse({ status: 200, description: 'Policy successfully updated' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policiesService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete policy (Admin)' })
  @ApiResponse({ status: 200, description: 'Policy successfully deleted' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.policiesService.remove(id);
  }
}
