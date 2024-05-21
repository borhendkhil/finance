import { Controller, Get, Post, Body, Param, UseGuards,Req, Put, Delete } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from '../dto/create-budget.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createBudgetDto: CreateBudgetDto, @Req() req:Request) {
    const user = req.user;
    return this.budgetsService.create(createBudgetDto,user["username"]);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req:Request) {
    const user = req.user;
    return this.budgetsService.findAll(user["username"]); 
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req:Request) {
    const user = req.user;
    return this.budgetsService.findOne(id, user["username"]);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBudgetDto: CreateBudgetDto, @Req() req:Request) {
    const user = req.user;
    return this.budgetsService.update(id, updateBudgetDto, user["username"]);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/delete')
  async remove(@Param('id') id: string, @Req() req:Request) {
    const user = req.user;
    return this.budgetsService.remove(id, user["username"]);
  }
}
