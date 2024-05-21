import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { Budget, BudgetSchema } from './budget.schema';
import { User, UserSchema } from '../user/user.schema';
import { Category, CategorySchema } from '../categories/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Budget.name, schema: BudgetSchema },
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
})
export class BudgetsModule {}
