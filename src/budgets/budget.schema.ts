import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { User } from '../user/user.schema';


@Schema()
export class Budget extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  period: string; //  'monthly'

  @Prop({ required: true, type: String, ref: User.name })
  user: string; // User name

  @Prop({ required: true, type: String })
  category: string; // Category ID or name
  remove: any;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
