import { Controller, Get, Post, Body, Param, UseGuards, Req, Delete, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: Request) {
    const user = req.user;
    return this.transactionsService.create(createTransactionDto, user["username"]);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    const user = req.user;
    return this.transactionsService.findAll(user["username"]);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const user = req.user;
    return this.transactionsService.findOne(id, user["username"]);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTransactionDto: CreateTransactionDto, @Req() req: Request) {
    const user = req.user;
    return this.transactionsService.update(id, updateTransactionDto, user["username"]);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/delete')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user;
    return this.transactionsService.remove(id, user["username"]);
  }
}
