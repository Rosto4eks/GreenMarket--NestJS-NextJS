import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import ObjectId, { Document } from 'mongoose';
import { Product } from './product.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  
  @Prop()
  user: string;

  @Prop()
  comment: string;

  @Prop({type: ObjectId, ref: 'Product'})
  product: Product;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);