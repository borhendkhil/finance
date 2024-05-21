import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, type: String, ref: User.name })
  user: string; // Reference to User

  @Prop({ required: true, type: String })
  category: string; // Category ID or name

  @Prop()
  description: string;
  remove: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
