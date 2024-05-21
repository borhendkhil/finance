import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {
    const newTransaction = new this.transactionModel({
      ...createTransactionDto,
      user: userId,
    });
    return newTransaction.save();
  }

  async findAll(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ user: userId }).populate('category').exec();
  }

  async findOne(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findOne({ _id: id, user: userId }).populate('category').exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {
    const transaction = await this.findOne(id, userId);
    transaction.amount = updateTransactionDto.amount;
    transaction.category = updateTransactionDto.category;
    transaction.date = updateTransactionDto.date.toString(); 
    transaction.description = updateTransactionDto.description;
    return transaction.save();
  }

  async remove(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.findOne(id, userId);
    return transaction.remove();
  }
}
