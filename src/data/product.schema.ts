import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import ObjectId, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  
  @Prop()
  name: string;

  @Prop()
  id: number;

  @Prop()
  price: number;

  @Prop({type: [{type: ObjectId, ref: 'Comment'}]})
  comments: Comment[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);