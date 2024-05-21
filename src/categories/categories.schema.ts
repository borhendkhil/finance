import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string; //  'income' or 'expense'
  remove: any;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
