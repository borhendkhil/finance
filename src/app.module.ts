import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { BudgetsModule } from './budgets/budgets.module';

@Module({
  imports: [AuthModule, 
    MongooseModule.forRoot('mongodb+srv://borhendkhiill:borhanodkhil1312@cluster0.5brwxhh.mongodb.net/'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TransactionsModule,
    CategoriesModule,
    BudgetsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
