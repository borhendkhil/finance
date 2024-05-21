import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from './budget.schema';
import { CreateBudgetDto } from '../dto/create-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name) private readonly budgetModel: Model<Budget>,
  ) {}

  async create(createBudgetDto: CreateBudgetDto, userId: string): Promise<Budget> {
    const newBudget = new this.budgetModel({
      ...createBudgetDto,
      user: userId,
    });
    return newBudget.save();
  }

  async findAll(userId: string): Promise<Budget[]> {
    return this.budgetModel.find({ user: userId }).populate('category').exec();
  }

  async findOne(id: string, userId: string): Promise<Budget> {
    const budget = await this.budgetModel.findOne({ _id: id, user: userId }).populate('category').exec();
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return budget;
  }

  async update(id: string, updateBudgetDto: CreateBudgetDto, userId: string): Promise<Budget> {
    const budget = await this.findOne(id, userId);
    budget.amount = updateBudgetDto.amount;
    budget.category = updateBudgetDto.category;
   
    return budget.save();
  }

  async remove(id: string, userId: string): Promise<Budget> {
    const budget = await this.findOne(id, userId);
    return budget.remove();
  }

  
}
